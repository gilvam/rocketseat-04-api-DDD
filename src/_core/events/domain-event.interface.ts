import { UniqueEntityId } from '@core/entities/unique-entity-id';

export interface IDomainEvent {
	occurredAt: Date;
	getAggregateId(): UniqueEntityId;
}
