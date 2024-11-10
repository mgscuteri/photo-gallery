import fastify from "fastify";
import path from "path";
import fs from "fs";
import fastifyStatic from "@fastify/static";

const server = fastify();

export const relativePathToBuild = "/browser";
export const fullPathToBuild = path.join(__dirname, relativePathToBuild);

console.log("serving content in: " + fullPathToBuild);

server.register(fastifyStatic, {
  root: fullPathToBuild,
  //prefix: "/static-ui/",
});

server.listen({ port: 80, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
  }
  console.log(`UI server listening at ${address}`);
});
