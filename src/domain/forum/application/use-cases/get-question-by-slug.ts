import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { Question } from '@domain-forum/enterprise/entities/question.model';

import { Either, left, right } from '@core/either';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';

interface IGetQuestionBySlugUseCase {
	slug: string;
}

type IGetQuestionBySlugUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		question: Question;
	}
>;

export class GetQuestionBySlugUseCase {
	constructor(private questionsRepository: IQuestionsRepository) {}

	async execute({
		slug,
	}: IGetQuestionBySlugUseCase): Promise<IGetQuestionBySlugUseCaseResponse> {
		const question = await this.questionsRepository.findBySlug(slug);

		if (!question) {
			return left(new ResourceNotFoundError());
		}

		return right({ question });
	}
}
