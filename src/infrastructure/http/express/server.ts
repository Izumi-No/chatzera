import { Server } from "@/utils/infrastructure/http/server";

import { router } from "./routes";
import { Application } from "express";
import express from "express";

export class ExpressServer implements Server {
  private readonly app: Application;

  constructor(private readonly port = 3000) {
    this.app = express();
    this.app.use(express.json());
    this.app.use("/", router);
  }

  async start(): Promise<void> {
    this.app.listen(this.port, () =>
      console.log("Webserver started on port", this.port)
    );
  }
}
