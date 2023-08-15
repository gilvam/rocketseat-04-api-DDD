import { IQuestionRepository } from '@domain-forum/application/repositories/question-repository';
import { Question } from '@domain-forum/enterprise/entities/question.model';

export class InMemoryQuestionRepository implements IQuestionRepository {
	items: Question[] = [];

	async create(question: Question) {
		this.items.push(question);
	}
}
