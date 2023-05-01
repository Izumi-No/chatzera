import { Router } from "hyper-express";
import { userRouter } from "./user.routes";

const router = new Router();

router.use("/users", userRouter);

router.get("*", (req, res) => {
  res.status(404).send("404");
});
export { router };
