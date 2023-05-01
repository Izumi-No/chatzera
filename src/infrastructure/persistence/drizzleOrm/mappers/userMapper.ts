import { User } from "@/domain/entities/user/user";
import { DrizzleUser } from "../modelTypes";

export class UserMapper {
  static async toPersistence(user: User): Promise<DrizzleUser> {
    return {
      id: user.id,
      nickname: user.nickname,
      password: await user.password.getHashedValue(),
    };
  }

  static toDomain(user: DrizzleUser): User {
    const userOrError = User.create(
      {
        nickname: user.nickname as string,
        password: user.password as string,
      },
      user.id as string
    );

    if (userOrError.isLeft()) {
      throw new Error("UserMapper.toDomain: " + userOrError.error);
    }

    return userOrError.value;
  }
}
