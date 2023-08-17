import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { Question } from '@domain-forum/enterprise/entities/question.model';

interface IGetQuestionBySlugUseCase {
	slug: string;
}

interface IGetQuestionBySlugUseCaseResponse {
	question: Question;
}

export class GetQuestionBySlugUseCase {
	constructor(private questionsRepository: IQuestionsRepository) {}

	async execute({
		slug,
	}: IGetQuestionBySlugUseCase): Promise<IGetQuestionBySlugUseCaseResponse> {
		const question = await this.questionsRepository.findBySlug(slug);

		if (!question) {
			throw new Error('Question not found.');
		}

		return { question };
	}
}
