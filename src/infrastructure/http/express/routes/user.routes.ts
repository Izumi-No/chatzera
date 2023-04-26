import { Router } from "express";
import { ExpressRouteAdapter as expressAdapter } from "../adapters/ExpressRouteAdapter";
import { container } from "tsyringe";
import { CreateUserController } from "@/presentation/controllers/user/createUserController";

const userRouter = Router();

userRouter.post("/", expressAdapter(container.resolve(CreateUserController)));

export { userRouter };
