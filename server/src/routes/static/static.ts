import {
  FastifyInstance,
  RouteShorthandOptions,
  RouteShorthandOptionsWithHandler,
} from "fastify";
import fs from "fs";
import path from "path";
import { FileService } from "../../services/fileService";
import * as mime from "mime-types";

export const staticRoutes = (
  fastify: FastifyInstance,
  options: RouteShorthandOptions,
  done: (err?: Error) => void
) => {
  fastify.get("/static/:file", getFile);
  done();
};

const getFile: RouteShorthandOptionsWithHandler = {
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
      const file = (req.params as any).file as string;
      const filepath = file
        ? path.join(FileService.getStaticUILocation(), file)
        : undefined;

      if (!file || file === "/" || !fs.existsSync(filepath)) {
        const file = "index.html";
        const filepath = path.join(FileService.getStaticUILocation(), file);
        const stream = fs.readFileSync(filepath);
        reply.type("text/html");
        reply.send(stream);
      } else {
        const mimeType = mime.lookup(filepath);
        const stream = fs.readFileSync(filepath);

        reply.type(mimeType || "unknown");
        reply.send(stream);
      }
    } catch (e) {
      reply.send(e);
    }
  },
};
