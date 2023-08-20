import { IQuestionCommentsRepository } from '@domain-forum/application/repositories/question-comments-repository.interface';
import { QuestionComment } from '@domain-forum/enterprise/entities/question-comment.model';

export class InMemoryQuestionCommentsRepository
implements IQuestionCommentsRepository
{
	items: QuestionComment[] = [];

	async create(questionComment: QuestionComment) {
		this.items.push(questionComment);
	}
}
