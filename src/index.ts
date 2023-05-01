import "./registry";
import { container } from "tsyringe";
import { Server } from "./shared/infrastructure/http/server";

const server = container.resolve<Server>("Server");

server.start();
