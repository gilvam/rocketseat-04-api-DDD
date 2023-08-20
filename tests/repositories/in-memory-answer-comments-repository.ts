import { IAnswerCommentsRepository } from '@domain-forum/application/repositories/answer-comments-repository.interface';
import { AnswerComment } from '@domain-forum/enterprise/entities/answer-comment.model';

export class InMemoryAnswerCommentsRepository
implements IAnswerCommentsRepository
{
	items: AnswerComment[] = [];

	async create(answerComment: AnswerComment) {
		this.items.push(answerComment);
	}
}
