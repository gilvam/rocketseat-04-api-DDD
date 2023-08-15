import { IAnswersRepository } from '@domain-forum/application/repositories/answers-repository.interface';
import { Answer } from '@domain-forum/enterprise/entities/answer.model';

export class InMemoryAnswersRepository implements IAnswersRepository {
	items: Answer[] = [];

	async create(answer: Answer) {
		this.items.push(answer);
	}
}
