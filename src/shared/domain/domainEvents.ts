import { AggregateRoot } from "./aggregateRoot";
import { DomainEvent } from "./domainEvent";

type DomainEventHandler = (event: DomainEvent) => void;

export class DomainEvents {
  private static _handlers: { [className: string]: DomainEventHandler[] } = {};
  private static _markedAggregates: AggregateRoot<any>[] = [];

  static clearMarkedAggregates(): void {
    this._markedAggregates.splice(0, this._markedAggregates.length);
  }

  static clearHandlers(): void {
    this._handlers = {};
  }

  static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const found = !!this.findMarkedAggregateByID(aggregate.id);

    if (!found) {
      this._markedAggregates.push(aggregate);
    }
  }

  static dispatchEventsForAggregate(id: string): void {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      aggregate.domainEvents.forEach((event) => this.dispatch(event));
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<any>
  ): void {
    const index = this._markedAggregates.findIndex((a) => a.equals(aggregate));
    this._markedAggregates.splice(index, 1);
  }

  static findMarkedAggregateByID(id: string): AggregateRoot<any> | null {
    let found: AggregateRoot<any> | null = null;
    for (let aggregate of this._markedAggregates) {
      if (aggregate.id == id) {
        found = aggregate;
        break;
      }
    }

    return found;
  }

  static dispatch(event: DomainEvent): void {
    const eventClassName: string = event.constructor.name;

    if (this._handlers.hasOwnProperty(eventClassName)) {
      const handlers = this._handlers[eventClassName];
      for (let handler of handlers) {
        handler(event);
      }
    }
  }

  static register(handler: DomainEventHandler, eventClassName: string): void {
    if (!Object.keys(this._handlers).includes(eventClassName)) {
      this._handlers[eventClassName] = [];
    }

    this._handlers[eventClassName].push(handler);
  }
}
