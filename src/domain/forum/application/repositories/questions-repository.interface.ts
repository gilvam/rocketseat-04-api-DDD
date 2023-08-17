import { Question } from '@domain-forum/enterprise/entities/question.model';

export interface IQuestionsRepository {
	create(question: Question): Promise<void>;
	findBySlug(slug: string): Promise<Question | undefined>;
	findById(id: string): Promise<Question | undefined>;
	delete(question: Question): Promise<void>;
	edit(question: Question): Promise<Question>;
}
