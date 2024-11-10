import fastify from "fastify";
import { filesRoutes } from "./routes/files/files";
import { staticRoutes } from "./routes/static/static";
import fs from "fs";
import path from "path";
import { FileService } from "./services/fileService";

const isHttps =
  fs.existsSync("./server.key") && fs.existsSync("./thetoaster_ddns_net.pem");

const port = isHttps ? 443 : 80;

const server = fastify({
  ...(isHttps
    ? {
        https: {
          key: fs.readFileSync("./server.key"),
          cert: fs.readFileSync("./thetoaster_ddns_net.pem"),
        },
      }
    : null),
});

server.addHook("onSend", async function (request, reply) {
  reply.headers({
    "Access-Control-Allow-Origin": "*",
  });
});

// register controllers
server.register(filesRoutes);
server.register(staticRoutes);

server.setNotFoundHandler((req, reply) => {
  const file = "index.html";
  const filepath = path.join(FileService.getStaticUILocation(), file);
  const stream = fs.readFileSync(filepath);
  reply.type("text/html");
  reply.send(stream);
});

server.listen({ port: port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
  }
  console.log(`server listening at ${address}`);
});
