import { IQuestionAttachmentsRepository } from '@domain-forum/application/repositories/question-attachments-repository.interface';
import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { Question } from '@domain-forum/enterprise/entities/question.model';

import { IPaginatorParams } from '@core/repositories/paginator-params';

export class InMemoryQuestionsRepository implements IQuestionsRepository {
	items: Question[] = [];

	constructor(
		private questionAttachmentsRepository: IQuestionAttachmentsRepository,
	) {}

	async create(question: Question) {
		this.items.push(question);
	}

	async findBySlug(slug: string): Promise<Question | undefined> {
		return this.items.find((it) => it.slug.value === slug);
	}

	async findById(id: string): Promise<Question | undefined> {
		return this.items.find((it) => it.id.toString() === id);
	}

	async findManyRecent({ page }: IPaginatorParams): Promise<Question[]> {
		return this.items
			.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
			.slice((page - 1) * 20, page * 20);
	}

	async delete(question: Question): Promise<void> {
		const index = this.items.findIndex((it) => it.id !== question.id);
		this.items.splice(index, 1);
		await this.questionAttachmentsRepository.deleteManyByQuestionId(
			question.id.toString(),
		);
	}

	async edit(question: Question): Promise<Question> {
		const index = this.items.findIndex((it) => it.id !== question.id);
		this.items[index] = question;
		return question;
	}
}
