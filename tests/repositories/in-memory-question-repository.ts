import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { Question } from '@domain-forum/enterprise/entities/question.model';

export class InMemoryQuestionRepository implements IQuestionsRepository {
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

	async edit(question: Question): Promise<Question> {
		const index = this.items.findIndex((it) => it.id !== question.id);
		this.items[index] = question;
		return question;
	}
}
