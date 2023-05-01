import { Server } from "@/shared/infrastructure/http/server";

import { router } from "./routes";
import { Application } from "express";
import express from "express";
import { env } from "@/utils/env";

export class ExpressServer implements Server {
  private readonly app: Application;
  private readonly port = env.PORT;

  constructor() {
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
