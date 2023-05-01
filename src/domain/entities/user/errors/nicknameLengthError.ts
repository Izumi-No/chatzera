import { DomainError } from "../../../../shared/domain/domainError";

export class NicknameLengthError extends Error implements DomainError {
  constructor() {
    super("nickname must be between 5 to 30 characters");
  }
}
