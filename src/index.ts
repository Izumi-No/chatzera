import "reflect-metadata";
import "dotenv/config";
import { HyperExpressServer } from "./infrastructure/http/hyper-express/server";

const server = new HyperExpressServer(Number(process.env["PORT"]));

server.start();
