import { AnswerComment } from '@domain-forum/enterprise/entities/answer-comment.model';

import { IPaginatorParams } from '@core/repositories/paginator-params';

export interface IAnswerCommentsRepository {
	create(answerComment: AnswerComment): Promise<void>;

	findById(id: string): Promise<AnswerComment | undefined>;

	findManyByAnswerId(
		answerId: string,
		params: IPaginatorParams,
	): Promise<AnswerComment[]>;

	delete(answerComment: AnswerComment): Promise<void>;
}
