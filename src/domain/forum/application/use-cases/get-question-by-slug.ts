import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { ResourceNotFoundError } from '@domain-forum/application/use-cases/_errors/resource-not-found.error';
import { Question } from '@domain-forum/enterprise/entities/question.model';

import { Either, left, right } from '@core/either';

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
