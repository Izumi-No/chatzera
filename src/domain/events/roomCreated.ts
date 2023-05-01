import { DomainEvent } from "@/shared/domain/domainEvent";
import { Room } from "../entities/room/room";

export class RoomCreated implements DomainEvent {
  readonly dateTimeOccurred: Date;
  constructor(public room: Room) {
    this.dateTimeOccurred = new Date();
  }
  get aggregateId(): string {
    return this.room.id;
  }
}
