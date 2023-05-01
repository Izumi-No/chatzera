import { DomainError } from "@/shared/domain/domainError";

export class NameLengthError extends Error implements DomainError {
  constructor() {
    super("Name must be between 5 to 10 characters");
  }
}
