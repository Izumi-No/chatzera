import { UserRepository } from "@/domain/repositories/userRepository";
import { UseCase } from "@/utils/application/useCase";
import { inject, singleton } from "tsyringe";

@singleton()
export class createUserUseCase
  implements UseCase<createUserUseCase.Request, createUserUseCase.Response>
{
  constructor(private userRepository: UserRepository) {}
  execute(
    request: createUserUseCase.Request
  ): Promise<createUserUseCase.Response> {}
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
