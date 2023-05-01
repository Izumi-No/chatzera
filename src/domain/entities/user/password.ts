import { Either, left, right } from "@/shared/either";

import { InvalidPasswordLengthError } from "./errors/invalidPasswordLengthError";
import { container } from "tsyringe";
import { Hasher } from "@/shared/infrastructure/crypto/hasher";

export class Password {
  private constructor(
    private password: string,
    public hashed: boolean,
    private readonly hasher: Hasher
  ) {}

  static validate(password: string): boolean {
    if (
      !password ||
      password.trim().length < 8 ||
      password.trim().length > 255
    ) {
      return false;
    }

    return true;
  }

  public async getHashedValue(): Promise<string> {
    if (this.hashed) {
      return this.password;
    }

    return await this.hasher.hash(this.password);
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;

    if (this.hashed) {
      hashed = this.password;

      return await this.hasher.compare(plainTextPassword, hashed);
      //return await verify(hashed, plainTextPassword);
    }

    return this.password == plainTextPassword;
  }

  static create(
    password: string,
    hashed = false
  ): Either<InvalidPasswordLengthError, Password> {
    if (!hashed && !this.validate(password)) {
      return left(new InvalidPasswordLengthError());
    }

    const hasher: Hasher = container.resolve("Hasher");

    return right(new Password(password, hashed, hasher));
  }
}
