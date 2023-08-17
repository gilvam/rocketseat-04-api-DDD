import { IQuestionRepository } from '@domain-forum/application/repositories/question-repository.interface';
import { Question } from '@domain-forum/enterprise/entities/question.model';

interface IGetQuestionBySlugUseCase {
	slug: string;
}

interface IGetQuestionBySlugUseCaseResponse {
	question: Question;
}

export class GetQuestionBySlugUseCase {
	constructor(private questionRepository: IQuestionRepository) {}

	async execute({
		slug,
	}: IGetQuestionBySlugUseCase): Promise<IGetQuestionBySlugUseCaseResponse> {
		const question = await this.questionRepository.findBySlug(slug);

		if (!question) {
			throw new Error('Question not found.');
		}

		return { question };
	}
}
