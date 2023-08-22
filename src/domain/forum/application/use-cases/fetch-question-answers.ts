import { IAnswersRepository } from '@domain-forum/application/repositories/answers-repository.interface';
import { Answer } from '@domain-forum/enterprise/entities/answer.model';

import { Either, right } from '@core/either';

interface IFetchQuestionAnswersUseCase {
	questionId: string;
	page: number;
}

type IFetchQuestionAnswersUseCaseResponse = Either<
	null,
	{
		answers: Answer[];
	}
>;

export class FetchQuestionAnswersUseCase {
	constructor(private answersRepository: IAnswersRepository) {}

	async execute({
		questionId,
		page,
	}: IFetchQuestionAnswersUseCase): Promise<IFetchQuestionAnswersUseCaseResponse> {
		const answers = await this.answersRepository.findManyByQuestionId(
			questionId,
			{
				page,
			},
		);

		return right({ answers });
	}
}
