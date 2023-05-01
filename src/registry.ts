import "reflect-metadata";
import { container } from "tsyringe";
import { Argon2Hasher } from "./infrastructure/crypto/argon2/argon2Hasher";
import { HyperExpressServer } from "./infrastructure/http/hyper-express/server";
import { DrizzleUserRepository } from "./infrastructure/persistence/drizzleOrm/repositories/drizzleUserRepository";
import { Hasher } from "./shared/infrastructure/crypto/hasher";
import { UserRepository } from "./domain/repositories/userRepository";
import { Server } from "@/shared/infrastructure/http/server";

container.registerSingleton<Hasher>("Hasher", Argon2Hasher);
container.registerSingleton<UserRepository>(
  "UserRepository",
  DrizzleUserRepository
);
container.registerSingleton<Server>("Server", HyperExpressServer);
