import {
  FastifyInstance,
  RouteShorthandOptions,
  RouteShorthandOptionsWithHandler,
} from "fastify";
import fs from "fs";
import path from "path";
import { FileService } from "../../services/fileService";
var JPEGDecoder = require("jpg-stream/decoder");

export const ALBUMS_DIR = "ALBUMS_DIR";

export const filesRoutes = (
  fastify: FastifyInstance,
  options: RouteShorthandOptions,
  done: (err?: Error) => void
) => {
  fastify.get("/albums", getAlbums);
  fastify.get("/albums/:albumName", getAlbumFiles);
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
    reply.send({ test: FileService.getAlbumLocation() ?? "ahh" });
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
  },
};

const getAlbumFiles: RouteShorthandOptionsWithHandler = {
  schema: {
    response: {
      200: {
        type: "array",
        additinoalProperties: true,
      },
    },
  },
  handler: async (req, reply) => {
    const albumName = (req.params as any).albumName as string;
    const albumsDir = FileService.getAlbumLocation();
    const albumPath = path.resolve(albumsDir, albumName);
    const files = fs.readdirSync(albumPath);
    const filesWithExif: FileNameWithExif[] = [];
    for (var file of files) {
      const relativeFilePath = path.join(albumPath, file);
      let exif = await getExifData(relativeFilePath);
      filesWithExif.push({
        fileName: file,
        exifData: exif,
      });
    }

    reply.send(filesWithExif);
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
export interface FileNameWithExif {
  fileName: string;
  exifData: any;
}
