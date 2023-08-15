import { Question } from '@domain-forum/enterprise/entities/question.model';

export interface IQuestionRepository {
	create(question: Question): Promise<void>;
	findBySlug(slug: string): Promise<Question | null>;
}
