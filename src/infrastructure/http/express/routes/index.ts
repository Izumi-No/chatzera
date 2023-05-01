import { Router } from "express";
import { userRouter } from "./user.routes";

const router = Router();

router.use("/users", userRouter);

router.get("*", (req, res) => {
  res.status(404).send("404");
});
export { router };
