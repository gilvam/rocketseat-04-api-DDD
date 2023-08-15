import { Answer } from '@/domain/forum/enterprise/entities/answer.model';

export interface IAnswersRepository {
	create(answer: Answer): Promise<void>;
}
