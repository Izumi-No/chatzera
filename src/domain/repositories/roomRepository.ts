import { Room } from "../entities/room/room";

export interface RoomRepository {
  save(room: Room): Promise<void>;
  findById(id: string): Promise<Room>;
  findAll(): Promise<Room[]>;
  findByName(name: string): Promise<Room>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  isNameAlreadyInUse(name: string): Promise<boolean>;
}
