import { IAnswerCommentsRepository } from '@domain-forum/application/repositories/answer-comments-repository.interface';
import { AnswerComment } from '@domain-forum/enterprise/entities/answer-comment.model';

import { Either, right } from '@core/either';

interface IFetchAnswerCommentsUseCase {
	answerId: string;
	page: number;
}

type IFetchAnswerCommentsUseCaseResponse = Either<
	null,
	{
		answerComments: AnswerComment[];
	}
>;

export class FetchAnswerCommentsUseCase {
	constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

	async execute({
		answerId,
		page,
	}: IFetchAnswerCommentsUseCase): Promise<IFetchAnswerCommentsUseCaseResponse> {
		const answerComments =
			await this.answerCommentsRepository.findManyByAnswerId(answerId, {
				page,
			});

		return right({ answerComments });
	}
}
