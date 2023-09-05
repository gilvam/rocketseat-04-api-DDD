import { Question } from '@domain-forum/enterprise/entities/question.model';

import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { DomainEvents } from '@core/events/domain-events';

export class QuestionBestAnswerChosenEvent implements DomainEvents {
	occurredAt: Date;
	question: Question;
	bestAnswerId: UniqueEntityId;

	constructor(question: Question, bestAnswerId: UniqueEntityId) {
		this.question = question;
		this.bestAnswerId = bestAnswerId;
		this.occurredAt = new Date();
	}

	getAggregateId(): UniqueEntityId {
		return this.question.id;
	}
}
