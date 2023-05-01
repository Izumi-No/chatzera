import { left, right } from "@/shared/either";
import { NicknameLengthError } from "./errors/nicknameLengthError";

export class Nickname {
  value: string;
  private constructor(nickname: string) {
    this.value = nickname;
  }

  static create(nickname: string) {
    if (nickname.length < 30 && nickname.length > 5) {
      return right(new Nickname(nickname));
    }

    return left(new NicknameLengthError());
  }
}
