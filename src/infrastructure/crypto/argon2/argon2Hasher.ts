import { Hasher } from "@/utils/infrastructure/crypto/hasher";
import { hash, verify } from "argon2";
import { registry } from "tsyringe";

export class Argon2Hasher extends Hasher {
  constructor() {
    super();
  }

  async hash(value: string): Promise<string> {
    return await hash(value);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await verify(hash, value);
  }
}
