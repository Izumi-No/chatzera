import { Message } from "../message/message";
import { Either, left, right } from "@/shared/either";
import { Name } from "./name";
import { AggregateRoot } from "@/shared/domain/aggregateRoot";

export class Room extends AggregateRoot<Room.Props> {
  private constructor(props: Room.Props, id?: string) {
    super(props, id);
  }

  static create(props: Room.CreateInput, id?: string): Room.CreateOutput {
    const createdAt = props.createdAt || new Date();
    if (!props.name) {
      return right(
        new Room(
          {
            messages: props.messages || [],
            createdAt,
            usersIds: props.usersIds,
          },
          id
        )
      );
    }
    const nameOrError = Name.create(props.name);

    if (nameOrError.isLeft()) {
      return left(nameOrError.error);
    }

    const name = nameOrError.value;

    return right(
      new Room(
        {
          name,
          messages: props.messages || [],
          createdAt,
          usersIds: props.usersIds,
        },
        id
      )
    );
  }

  addMessage(message: Message) {
    this.messages.push(message);
  }

  get messages(): Message[] {
    return this.props.messages;
  }
}

namespace Room {
  export interface Props {
    name?: Name;
    messages: Message[];
    createdAt: Date;
    usersIds: string[];
  }

  export interface CreateInput {
    name?: string;
    messages?: Message[];
    createdAt?: Date;
    usersIds: string[];
  }

  export type CreateOutput = Either<unknown, Room>;
}
