import { IQuestionCommentsRepository } from '@domain-forum/application/repositories/question-comments-repository.interface';
import { QuestionComment } from '@domain-forum/enterprise/entities/question-comment.model';

import { IPaginatorParams } from '@core/repositories/paginator-params';

export class InMemoryQuestionCommentsRepository
implements IQuestionCommentsRepository
{
	items: QuestionComment[] = [];

	async create(questionComment: QuestionComment) {
		this.items.push(questionComment);
	}

	async findById(id: string): Promise<QuestionComment | undefined> {
		return this.items.find((it) => it.id.toString() === id);
	}

	async findManyByQuestionId(
		questionId: string,
		{ page }: IPaginatorParams,
	): Promise<QuestionComment[]> {
		return this.items
			.filter((item) => item.questionId.toString() === questionId)
			.slice((page - 1) * 20, page * 20);
	}

	async delete(questionComment: QuestionComment): Promise<void> {
		const index = this.items.findIndex((it) => it.id !== questionComment.id);
		this.items.splice(index, 1);
	}
}
