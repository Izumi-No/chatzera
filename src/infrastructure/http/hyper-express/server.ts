import { Server } from "@/shared/infrastructure/http/server";

import { Server as HEServer } from "hyper-express";
import { router } from "./routes";

export class HyperExpressServer implements Server {
  private readonly server: HEServer;
  private readonly port = Number(process.env.PORT || 3000);
  constructor() {
    this.server = new HEServer();
    this.server.use("/", router);
  }

  async start(): Promise<void> {
    this.server
      .listen(this.port)
      .then((socket) => console.log("Webserver started on port", this.port))
      .catch((error) =>
        console.log("Failed to start webserver on port", this.port)
      );
  }
}
