import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { Question } from '@domain-forum/enterprise/entities/question.model';

import { Either, right } from '@core/either';

interface IFetchRecentQuestionsUseCase {
	page: number;
}

type IFetchRecentQuestionsUseCaseResponse = Either<
	null,
	{
		questions: Question[];
	}
>;

export class FetchRecentQuestionsUseCase {
	constructor(private questionsRepository: IQuestionsRepository) {}

	async execute({
		page,
	}: IFetchRecentQuestionsUseCase): Promise<IFetchRecentQuestionsUseCaseResponse> {
		const questions = await this.questionsRepository.findManyRecent({ page });

		return right({ questions });
	}
}
