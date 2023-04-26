import { createUserUseCase } from "@/application/useCases/User/createUserUseCase";
import { CreateUserDTO } from "@/presentation/dtos/user/createUserDTO";
import { Controller } from "@/utils/presentation/controller";
import { HttpHelper } from "@/utils/presentation/httpHelper";
import { HttpResponse } from "@/utils/presentation/httpResponse";
import { singleton } from "tsyringe";

@singleton()
export class CreateUserController implements Controller {
  constructor(private readonly createUserUseCase: createUserUseCase) {}
  async handle({
    nickname,
    password,
    passwordConfirmation,
  }: CreateUserDTO): Promise<HttpResponse> {
    // TODO: decouple error handling from controllers and usecases
    try {
      if (password !== passwordConfirmation) {
        return HttpHelper.fail(new Error("Passwords don't match"));
      }

      const response = await this.createUserUseCase.execute({
        nickname,
        password,
        passwordConfirmation,
      });

      return HttpHelper.ok(response);
    } catch (error) {
      return HttpHelper.fail(error as Error);
    }
  }
}
