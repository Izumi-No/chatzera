import { Entity } from "@/shared/domain/entity";
import { Room } from "../room/room";

export class Message extends Entity<Message.Props> {
  constructor(props: Message.Props, id?: string) {
    super(props, id);
  }
}

namespace Message {
  export interface Props {
    content: string;
    createdAt: Date;
    room: Room;
    authorId: string;
  }
}
