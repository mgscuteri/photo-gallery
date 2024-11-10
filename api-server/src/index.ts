import fastify from "fastify";
import { filesRoutes } from "./routes/files/files";

const server = fastify();
server.addHook("onSend", async function (request, reply) {
  reply.headers({
    "Access-Control-Allow-Origin": "*",
  });
});

server.register(filesRoutes);

server.listen({ port: 81, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
  }
  console.log(`API server listening at ${address}`);
});
