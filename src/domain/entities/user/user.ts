import { Entity } from "@/shared/domain/entity";
import { Either, left, right } from "@/shared/either";
import { Nickname } from "./nickname";
import { Password } from "./password";
import { NicknameLengthError } from "./errors/nicknameLengthError";
import { InvalidPasswordLengthError } from "./errors/invalidPasswordLengthError";
import { AggregateRoot } from "@/shared/domain/aggregateRoot";

export class User extends AggregateRoot<User.Props> {
  private constructor(props: User.Props, id?: string) {
    super(props, id);
  }

  static create(
    { nickname, password, roomsId }: User.CreateInput,
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
        {
          nickname: nicknameOrError.value,
          password: passwordOrError.value,
          roomsId: roomsId || [],
        },
        id
      )
    );
  }

  get nickname(): string {
    return this.props.nickname.value;
  }

  get password(): Password {
    return this.props.password;
  }
}

namespace User {
  export interface Props {
    nickname: Nickname;
    password: Password;
    roomsId: string[];
  }
  export interface CreateInput {
    nickname: string;
    password: string;
    roomsId?: string[];
  }
  export type CreateOutput = Either<
    NicknameLengthError | InvalidPasswordLengthError,
    User
  >;
}
