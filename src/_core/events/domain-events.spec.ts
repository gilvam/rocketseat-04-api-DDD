import { describe, expect, it, vi } from 'vitest';

import { AggregateRoot } from '@core/entities/aggregate-root';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { IDomainEvent } from '@core/events/domain-event.interface';
import { DomainEvents } from '@core/events/domain-events';

export class CustomAggregateCreated implements IDomainEvent {
	occurredAt: Date;

  private aggregate: CustomAggregate; // eslint-disable-line

	constructor(aggregate: CustomAggregate) {
		this.occurredAt = new Date();
		this.aggregate = aggregate;
	}

	getAggregateId(): UniqueEntityId {
		return this.aggregate.id;
	}
}

export class CustomAggregate extends AggregateRoot<any> {
	static create() {
		const aggregate = new CustomAggregate(null);
		aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));
		return aggregate;
	}
}

describe('domain events', () => {
	it('should be able to dispatch and listen to events', () => {
		const callbackSpy = vi.fn();
		// Registered subscriber (listening to the "response created" event)
		DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

		// I'm creating a response but WITHOUT saving it in the database
		const aggregate = CustomAggregate.create();
		// I'm making sure the event was created, but it was NOT triggered
		expect(aggregate.domainEvents).toHaveLength(1);

		// I'm saving the response in the database and thus triggering the event
		DomainEvents.dispatchEventsForAggregate(aggregate.id);
		// The subscriber listens to the event and does what needs to be done with the data
		expect(callbackSpy).toHaveBeenCalled();
		expect(aggregate.domainEvents).toHaveLength(0);
	});
});
