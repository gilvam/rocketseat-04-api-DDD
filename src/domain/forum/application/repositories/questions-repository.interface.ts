import { Question } from '@domain-forum/enterprise/entities/question.model';

import { IPaginatorParams } from '@core/repositories/paginator-params';

export interface IQuestionsRepository {
	create(question: Question): Promise<void>;
	findBySlug(slug: string): Promise<Question | undefined>;
	findById(id: string): Promise<Question | undefined>;
	findManyRecent(params: IPaginatorParams): Promise<Question[]>;
	delete(question: Question): Promise<void>;
	edit(question: Question): Promise<Question>;
}
