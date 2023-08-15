import { IQuestionRepository } from '@domain-forum/application/repositories/question-repository.interface';
import { Question } from '@domain-forum/enterprise/entities/question.model';

export class InMemoryQuestionRepository implements IQuestionRepository {
	items: Question[] = [];

	async create(question: Question) {
		this.items.push(question);
	}

	async findBySlug(slug: string): Promise<Question | null> {
		return this.items.find((it) => it.slug.value === slug) || null;
	}
}
