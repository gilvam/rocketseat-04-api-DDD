import { IAnswerCommentsRepository } from '@domain-forum/application/repositories/answer-comments-repository.interface';
import { AnswerComment } from '@domain-forum/enterprise/entities/answer-comment.model';

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

	async delete(answerComment: AnswerComment): Promise<void> {
		const index = this.items.findIndex((it) => it.id !== answerComment.id);
		this.items.splice(index, 1);
	}
}
