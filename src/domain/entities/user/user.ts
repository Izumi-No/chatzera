import { Entity } from "@/utils/domain/entity";
import { Either, left, right } from "@/utils/either";
import { Nickname } from "./nickname";
import { Password } from "./password";
import { NicknameLengthError } from "./errors/nicknameLengthError";
import { InvalidPasswordLengthError } from "./errors/invalidPasswordLengthError";

export class User extends Entity<User.Props> {
  private constructor(props: User.Props, id?: string) {
    super(props, id);
  }

  static create(
    { nickname, password }: User.CreateInput,
    id?: string
  ): User.CreateOutput {
    const nicknameOrError = Nickname.create(nickname);
    const passwordOrError = Password.create(password);

    if (nicknameOrError.isLeft()) {
      return nicknameOrError;
    }

    if (passwordOrError.isLeft()) {
      return passwordOrError;
    }

    return right(
      new User(
        { nickname: nicknameOrError.value, password: passwordOrError.value },
        id
      )
    );
  }
}

namespace User {
  export interface Props {
    nickname: Nickname;
    password: Password;
  }
  export interface CreateInput {
    nickname: string;
    password: string;
  }
  export type CreateOutput = Either<
    NicknameLengthError | InvalidPasswordLengthError,
    User
  >;
}
