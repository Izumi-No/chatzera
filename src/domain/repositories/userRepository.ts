import { User } from "../entities/user/user";

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  findByNickname(nickname: string): Promise<User>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  isNicknameAlreadyInUse(nickname: string): Promise<boolean>;
}
