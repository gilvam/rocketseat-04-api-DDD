import { IQuestionCommentsRepository } from '@domain-forum/application/repositories/question-comments-repository.interface';
import { QuestionComment } from '@domain-forum/enterprise/entities/question-comment.model';

import { Either, right } from '@core/either';

interface IFetchQuestionCommentsUseCase {
	questionId: string;
	page: number;
}

type IFetchQuestionCommentsUseCaseResponse = Either<
	null,
	{
		questionComments: QuestionComment[];
	}
>;

export class FetchQuestionCommentsUseCase {
	constructor(
		private questionCommentsRepository: IQuestionCommentsRepository,
	) {}

	async execute({
		questionId,
		page,
	}: IFetchQuestionCommentsUseCase): Promise<IFetchQuestionCommentsUseCaseResponse> {
		const questionComments =
			await this.questionCommentsRepository.findManyByQuestionId(
				questionId,
				{
					page,
				},
			);

		return right({ questionComments });
	}
}
