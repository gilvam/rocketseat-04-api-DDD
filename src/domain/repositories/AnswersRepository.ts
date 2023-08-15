import { Answer } from '@entities/answer.model';

export interface IAnswersRepository {
	create(answer: Answer): Promise<void>;
}
