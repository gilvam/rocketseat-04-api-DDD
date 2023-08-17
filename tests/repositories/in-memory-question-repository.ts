import { IQuestionRepository } from '@domain-forum/application/repositories/question-repository.interface';
import { Question } from '@domain-forum/enterprise/entities/question.model';

export class InMemoryQuestionRepository implements IQuestionRepository {
	items: Question[] = [];

	async create(question: Question) {
		this.items.push(question);
	}

	async findBySlug(slug: string): Promise<Question | undefined> {
		return this.items.find((it) => it.slug.value === slug);
	}

	async findById(id: string): Promise<Question | undefined> {
		return this.items.find((it) => it.id.toString() === id);
	}

	async delete(question: Question): Promise<void> {
		const index = this.items.findIndex((it) => it.id !== question.id);
		this.items.splice(index, 1);
	}
}
