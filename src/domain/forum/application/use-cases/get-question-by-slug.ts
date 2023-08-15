import { IQuestionRepository } from '@domain-forum/application/repositories/question-repository.interface';
import { Question } from '@domain-forum/enterprise/entities/question.model';

interface getQuestionBySlugUseCase {
	slug: string;
}

interface getQuestionBySlugUseCaseResponse {
	question: Question;
}

export class GetQuestionBySlug {
	constructor(private questionRepository: IQuestionRepository) {}

	async execute({
		slug,
	}: getQuestionBySlugUseCase): Promise<getQuestionBySlugUseCaseResponse> {
		const question = await this.questionRepository.findBySlug(slug);

		if (!question) {
			throw new Error('Question not found.');
		}

		return { question };
	}
}
