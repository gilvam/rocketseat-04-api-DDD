import { IPaginatorParams } from '@core/repositories/paginator-params';

import { Answer } from '@/domain/forum/enterprise/entities/answer.model';

export interface IAnswersRepository {
	create(answer: Answer): Promise<void>;
	findById(id: string): Promise<Answer | undefined>;
	findManyBuyQuestionId(
		questionId: string,
		params: IPaginatorParams,
	): Promise<Answer[]>;
	delete(id: Answer): Promise<void>;
	edit(answer: Answer): Promise<Answer>;
}
