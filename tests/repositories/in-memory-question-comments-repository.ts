import { IQuestionCommentsRepository } from '@domain-forum/application/repositories/question-comments-repository.interface';
import { QuestionComment } from '@domain-forum/enterprise/entities/question-comment.model';

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

	async delete(questionComment: QuestionComment): Promise<void> {
		const index = this.items.findIndex((it) => it.id !== questionComment.id);
		this.items.splice(index, 1);
	}
}
