import { User } from "@/domain/entities/user/user";
import { User } from "@/domain/entities/user/user";
import { UserRepository } from "@/domain/repositories/userRepository";
import { DrizzleUserRepository } from "@/infrastructure/persistence/drizzleOrm/repositories/drizzleUserRepository";
import { UseCase } from "@/shared/application/useCase";
import { container, registry, singleton } from "tsyringe";

@registry([{ token: "UserRepository", useClass: DrizzleUserRepository }])
@singleton()
export class createUserUseCase
  implements UseCase<createUserUseCase.Request, createUserUseCase.Response>
{
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = container.resolve("UserRepository");
  }

  async execute(
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = container.resolve("UserRepository");
  }

  async execute(
    request: createUserUseCase.Request
  ): Promise<createUserUseCase.Response> {
    const userOrError = User.create(request);

    if (userOrError.isLeft()) {
      throw userOrError.error;
    }

    await this.userRepository.save(userOrError.value);
    return {
      id: userOrError.value.id,
      nickname: userOrError.value.nickname,
      password: await userOrError.value.password.getHashedValue(),
    };
  }
  ): Promise<createUserUseCase.Response> {
    const userOrError = User.create(request);

    if (userOrError.isLeft()) {
      throw userOrError.error;
    }

    await this.userRepository.save(userOrError.value);
    return {
      id: userOrError.value.id,
      nickname: userOrError.value.nickname,
      password: await userOrError.value.password.getHashedValue(),
    };
  }
}

namespace createUserUseCase {
  export interface Request {
    nickname: string;
    password: string;
    passwordConfirmation: string;
  }
  export interface Response {
    id: string;
    nickname: string;
    password: string;
  }
}
