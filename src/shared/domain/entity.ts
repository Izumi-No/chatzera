import { randomUUID } from "crypto";

export class Entity<T> {
  private readonly _id: string;
  constructor(protected props: T, id?: string) {
    this._id = id ? id : randomUUID();
  }

  get id() {
    return this._id;
  }

  equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (!(object instanceof Entity)) {
      return false;
    }

    return this.id == object.id;
  }
}
