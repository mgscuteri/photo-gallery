import fastify from "fastify";
import path from "path";
import fs from "fs";
import { filesRoutes } from "./routes/files/files";
import { fastifyStatic } from "@fastify/static";

const server = fastify();
server.register(fastifyStatic, {
  root: path.resolve(process.cwd(), "..", "..", "albums"),
  prefix: "/albums/",
});
server.register(filesRoutes);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
