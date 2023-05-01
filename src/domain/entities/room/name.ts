import { left, right } from "@/shared/either";
import { NameLengthError } from "./errors/NameLengthError";

export class Name {
  value: string;
  private constructor(name: string) {
    this.value = name;
  }

  static create(name: string) {
    if (name.length < 10 && name.length > 5) {
      return right(new Name(name));
    }

    return left(new NameLengthError());
  }
}
