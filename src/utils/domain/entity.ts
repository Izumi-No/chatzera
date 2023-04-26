import { randomUUID } from "crypto";

export class Entity<T> {
  private readonly _id: string;
  constructor(protected props: T, id?: string) {
    this._id = id ? id : randomUUID();
  }

  get id() {
    return this._id;
  }
}
