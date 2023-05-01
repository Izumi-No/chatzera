import { DomainEvent } from "./domainEvent";
import { DomainEvents } from "./domainEvents";
import { Entity } from "./entity";

export class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: DomainEvent[] = [];

  constructor(props: T, id?: string) {
    super(props, id);
  }

  get domainEvents() {
    return this._domainEvents;
  }

  clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
    this.logDomainEventAdded(domainEvent);
  }

  private logDomainEventAdded(domainEvent: DomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.info(
      `[Domain Event Created]:`,
      thisClass?.constructor.name,
      "==>",
      domainEventClass?.constructor.name
    );
  }
}
