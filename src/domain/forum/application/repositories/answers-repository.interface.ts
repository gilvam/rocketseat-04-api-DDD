import { Answer } from '@/domain/forum/enterprise/entities/answer.model';

export interface IAnswersRepository {
	create(answer: Answer): Promise<void>;
	findById(id: string): Promise<Answer | undefined>;
	delete(id: Answer): Promise<void>;
}
