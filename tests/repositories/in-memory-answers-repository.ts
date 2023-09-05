import { IAnswerAttachmentsRepository } from '@domain-forum/application/repositories/answer-attachments-repository.interface';
import { IAnswersRepository } from '@domain-forum/application/repositories/answers-repository.interface';
import { Answer } from '@domain-forum/enterprise/entities/answer.model';

import { DomainEvents } from '@core/events/domain-events';
import { IPaginatorParams } from '@core/repositories/paginator-params';

export class InMemoryAnswersRepository implements IAnswersRepository {
	items: Answer[] = [];

	constructor(
		private answerAttachmentsRepository: IAnswerAttachmentsRepository,
	) {}

	async create(answer: Answer) {
		this.items.push(answer);

		DomainEvents.dispatchEventsForAggregate(answer.id);
	}

	async findById(id: string): Promise<Answer | undefined> {
		return this.items.find((it) => it.id.toString() === id);
	}

	async findManyByQuestionId(
		questionId: string,
		{ page }: IPaginatorParams,
	): Promise<Answer[]> {
		return this.items
			.filter((item) => item.questionId.toString() === questionId)
			.slice((page - 1) * 20, page * 20);
	}

	async delete(answer: Answer): Promise<void> {
		const index = this.items.findIndex((it) => it.id !== answer.id);
		this.items.splice(index, 1);

		await this.answerAttachmentsRepository.deleteManyByAnswerId(
			answer.id.toString(),
		);
	}

	async edit(answer: Answer): Promise<Answer> {
		const index = this.items.findIndex((it) => it.id !== answer.id);
		this.items[index] = answer;

		DomainEvents.dispatchEventsForAggregate(answer.id);

		return answer;
	}
}
