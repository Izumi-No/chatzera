import { container } from "tsyringe";
import { Argon2Hasher } from "./infrastructure/crypto/argon2/argon2Hasher";

container.register("Hasher", {
  useClass: Argon2Hasher,
});
