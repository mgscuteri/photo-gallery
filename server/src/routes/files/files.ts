import {
  FastifyInstance,
  RouteShorthandOptions,
  RouteShorthandOptionsWithHandler,
} from "fastify";
import fs from "fs";
import path from "path";
import { FileService } from "../../services/fileService";
var JPEGDecoder = require("jpg-stream/decoder");
var concat = require("concat-frames");

export const ALBUMS_DIR = "ALBUMS_DIR";

export const filesRoutes = (
  fastify: FastifyInstance,
  options: RouteShorthandOptions,
  done: (err?: Error) => void
) => {
  fastify.get("/albums", getAlbums);
  fastify.get("/albums/:albumName", getAlbumFiles);
  fastify.get("/albums/:albumName/:photoName", getPhoto);
  fastify.get("/test", getTest);
  done();
};

const getTest: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          test: { type: "string" },
        },
      },
    },
  },
  handler: async (req, reply) => {
    try {
      reply.send({ test: FileService.getAlbumLocation() ?? "ahh" });
    } catch (e) {
      reply.send(e);
    }
  },
};

const getAlbums: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            albumName: { type: "string" },
            thumbNail: { type: "string" },
          },
        },
      },
    },
  },
  handler: (req, reply) => {
    try {
      const albumsDir = FileService.getAlbumLocation();
      const albumNames = fs.readdirSync(albumsDir, {
        recursive: false,
        encoding: null,
      });
      const resp = albumNames.map((albumName) => {
        let thumbNail = "";
        const thumbNailPath = path.resolve(albumName, "_thumbnail.jpg");
        const thumbNailExists = fs.existsSync(thumbNailPath);
        if (thumbNailExists) {
          return thumbNailPath;
        } else {
          const albumLocation = path.resolve(albumsDir, albumName);
          const albumPhotos = fs.readdirSync(albumLocation, {
            recursive: false,
            encoding: null,
          });
          thumbNail = albumPhotos.length >= 0 ? albumPhotos[0] : "";
        }

        return {
          albumName,
          thumbNail,
        };
      });
      reply.send(resp);
    } catch (e) {
      reply.send(e);
    }
  },
};

const getAlbumFiles: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            fileName: { type: "string" },
            exifData: {
              type: "object",
              properties: {
                image: {
                  type: "object",
                  properties: {
                    Make: { type: "string" },
                    Model: { type: "string" },
                    Orientation: { type: "integer" },
                    Software: { type: "string" },
                  },
                  required: [],
                },
                exif: {
                  type: "object",
                  properties: {
                    FocalLength: { type: "string" },
                    ExposureTime: { type: "string" },
                    FNumber: { type: "string" },
                    ISO: { type: "integer" },
                    DateTimeOriginal: { type: "string", format: "date-time" },
                    PixelXDimension: { type: "integer" },
                    PixelYDimension: { type: "integer" },
                  },
                  required: [],
                },
              },
              required: [],
            },
          },
          required: ["fileName", "exifData"],
        },
      },
    },
  },
  handler: async (req, reply) => {
    try {
      const albumName = (req.params as any).albumName as string;
      if (!albumName) {
        reply.statusCode = 400;
        reply.send("missing album name in path");
        return;
      }
      const albumsDir = FileService.getAlbumLocation();
      const albumPath = path.resolve(albumsDir, albumName);
      const files = fs.readdirSync(albumPath);
      const filesWithExif: FileNameWithExif[] = [];
      for (var file of files) {
        if (file.startsWith("._") || file.startsWith(".DS_Store")) {
          continue;
        }
        const relativeFilePath = path.join(albumPath, file);
        let exif = await getExifData(relativeFilePath);
        if (exif.image.PrintIM) {
          delete exif.image.PrintIM;
        }
        if (exif.exif.MakerNote) {
          delete exif.exif.MakerNote;
        }
        if (exif.exif.UserComment) {
          delete exif.exif.UserComment;
        }
        if (exif.gps) {
          delete exif.gps;
        }
        filesWithExif.push({
          fileName: file,
          exifData: exif,
        });
      }
      reply.send(filesWithExif);
    } catch (e) {
      reply.send(e);
    }
  },
};

const getPhoto: RouteShorthandOptionsWithHandler = {
  schema: {
    querystring: {
      height: { type: "number" },
      width: { type: "number" },
    },
    response: {
      200: {
        type: "array",
        additinoalProperties: true,
      },
    },
  },
  handler: async (req, reply) => {
    try {
      const albumName = (req.params as any).albumName as string;
      const photoName = (req.params as any).photoName as string;

      const filepath = path.resolve(
        FileService.getAlbumLocation(),
        albumName,
        photoName
      );

      const stream = fs.readFileSync(filepath);
      // // const data = await getExifData(filepath);
      // // const height = (req.query as any).height ?? data.exif.PixelYDimension;
      // // const width = (req.query as any).height ?? data.exif.PixelXDimension;

      // // const file = await compressPhoto(filepath, height, width);
      // // const buffer = file[0].pixels;

      // reply.header("Content-Type", "image/jpeg");

      reply.type("image/jpeg");
      reply.send(stream);
    } catch (e) {
      reply.send(e);
    }
  },
};

async function getExifData(path: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(new JPEGDecoder())
      .on("meta", function (meta: any) {
        resolve(meta);
      });
  });
}

async function compressPhoto(
  path: string,
  height: number,
  width: number
): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(new JPEGDecoder({ height: height, width: width }))
      .pipe(
        concat(function (frames) {
          resolve(frames);
        })
      );
  });
}

export interface FileNameWithExif {
  fileName: string;
  exifData: any;
}
