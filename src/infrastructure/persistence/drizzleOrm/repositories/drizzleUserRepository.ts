import { UserRepository } from "@/domain/repositories/userRepository";
import { drizzleConnection } from "../connection";
import { User } from "@/domain/entities/user/user";
import { users } from "../schema/users";
import { eq } from "drizzle-orm";

import { UserMapper } from "../mappers/userMapper";

export class DrizzleUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    const persistenceUser = await UserMapper.toPersistence(user);

    await drizzleConnection.insert(users).values(persistenceUser);
  }
  async findById(id: string): Promise<User> {
    const [user] = await drizzleConnection
      .select()
      .from(users)
      .where(eq(users.id, id));

    return UserMapper.toDomain(user);
  }
  async findAll(): Promise<User[]> {
    const result = await drizzleConnection.select().from(users);
    return result.map((user) => UserMapper.toDomain(user));
  }
  async findByNickname(nickname: string): Promise<User> {
    const [user] = await drizzleConnection
      .select()
      .from(users)
      .where(eq(users.nickname, nickname));

    return UserMapper.toDomain(user);
  }
  async delete(id: string): Promise<void> {
    await drizzleConnection.delete(users).where(eq(users.id, id));
  }
  async exists(id: string): Promise<boolean> {
    const [user] = await drizzleConnection
      .select()
      .from(users)
      .where(eq(users.id, id));

    return !!user;
  }
  async isNicknameAlreadyInUse(nickname: string): Promise<boolean> {
    const [user] = await drizzleConnection
      .select()
      .from(users)
      .where(eq(users.nickname, nickname));

    return !!user;
  }
}
