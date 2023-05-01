import { Router } from "hyper-express";
import { hyperExpressRouteAdapter as HEAdapter } from "../adapters/hyperExpressRouteAdapter";
import { container } from "tsyringe";
import { CreateUserController } from "@/presentation/controllers/user/createUserController";

const userRouter = new Router();

userRouter.post("/", HEAdapter(container.resolve(CreateUserController)));

export { userRouter };
