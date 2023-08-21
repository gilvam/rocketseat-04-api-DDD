import { IAnswerCommentsRepository } from '@domain-forum/application/repositories/answer-comments-repository.interface';
import { AnswerComment } from '@domain-forum/enterprise/entities/answer-comment.model';

import { IPaginatorParams } from '@core/repositories/paginator-params';

export class InMemoryAnswerCommentsRepository
implements IAnswerCommentsRepository
{
	items: AnswerComment[] = [];

	async create(answerComment: AnswerComment) {
		this.items.push(answerComment);
	}

	async findById(id: string): Promise<AnswerComment | undefined> {
		return this.items.find((it) => it.id.toString() === id);
	}

	async findManyByAnswerId(
		answerId: string,
		{ page }: IPaginatorParams,
	): Promise<AnswerComment[]> {
		return this.items
			.filter((item) => item.answerId.toString() === answerId)
			.slice((page - 1) * 20, page * 20);
	}

	async delete(answerComment: AnswerComment): Promise<void> {
		const index = this.items.findIndex((it) => it.id !== answerComment.id);
		this.items.splice(index, 1);
	}
}
