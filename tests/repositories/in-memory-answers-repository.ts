import { IAnswersRepository } from '@domain-forum/application/repositories/answers-repository.interface';
import { Answer } from '@domain-forum/enterprise/entities/answer.model';

export class InMemoryAnswersRepository implements IAnswersRepository {
	items: Answer[] = [];

	async create(answer: Answer) {
		this.items.push(answer);
	}

	async findById(id: string): Promise<Answer | undefined> {
		return this.items.find((it) => it.id.toString() === id);
	}

	async delete(answer: Answer): Promise<void> {
		const index = this.items.findIndex((it) => it.id !== answer.id);
		this.items.splice(index, 1);
	}
}
