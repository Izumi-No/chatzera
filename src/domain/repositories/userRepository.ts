import { User } from "../entities/user/user";

export interface UserRepository {
  save(user: User): Promise<void>;
  find(id: string): Promise<User[]>;
  findAll(): Promise<User[]>;
  findByNickname(nickname: string): Promise<User>;
  delete(id: string): Promise<void>;
}
