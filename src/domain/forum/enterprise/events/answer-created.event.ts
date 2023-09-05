import { Answer } from '@domain-forum/enterprise/entities/answer.model';

import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { DomainEvents } from '@core/events/domain-events';

export class AnswerCreatedEvent implements DomainEvents {
	answer: Answer;
	occurredAt: Date;

	constructor(answer: Answer) {
		this.answer = answer;
		this.occurredAt = new Date();
	}

	getAggregateId(): UniqueEntityId {
		return this.answer.id;
	}
}
