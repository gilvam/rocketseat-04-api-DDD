import { Entity } from '@core/entities/entity';
import { IDomainEvent } from '@core/events/domain-event.interface';
import { DomainEvents } from '@core/events/domain-events';

export abstract class AggregateRoot<T> extends Entity<T> {
	private _domainEvents: IDomainEvent[] = [];

	get domainEvents(): IDomainEvent[] {
		return this._domainEvents;
	}

	protected addDomainEvent(domainEvent: IDomainEvent): void {
		this._domainEvents.push(domainEvent);
		DomainEvents.markAggregateForDispatch(this);
	}

	clearEvents() {
		this._domainEvents = [];
	}
}
