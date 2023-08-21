import { QuestionComment } from '@domain-forum/enterprise/entities/question-comment.model';

import { IPaginatorParams } from '@core/repositories/paginator-params';

export interface IQuestionCommentsRepository {
	create(questionComment: QuestionComment): Promise<void>;
	findById(id: string): Promise<QuestionComment | undefined>;
	findManyByQuestionId(
		questionId: string,
		params: IPaginatorParams,
	): Promise<QuestionComment[]>;
	delete(questionComment: QuestionComment): Promise<void>;
}
