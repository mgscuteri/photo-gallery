import fastify from "fastify";
import path from "path";
import fs from "fs";
import { filesRoutes } from "./routes/files/files";
import { fastifyStatic } from "@fastify/static";
import { FileService } from "./services/fileService";

const server = fastify();
export const staticAlbumDir = FileService.getAlbumLocation();
console.log(`root static dir: ${staticAlbumDir}`);
if (!fs.existsSync(staticAlbumDir)) {
  throw "dir does not exist";
}

server.register(fastifyStatic, {
  root: staticAlbumDir,
  prefix: "/albums/",
});
server.register(filesRoutes);

server.listen({ port: 80, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

// server.listen({ port: 443, host: "0.0.0.0" }, (err, address) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }
//   console.log(`Server listening at ${address}`);
// });
