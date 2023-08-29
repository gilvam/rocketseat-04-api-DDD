import { IQuestionCommentsRepository } from '@domain-forum/application/repositories/question-comments-repository.interface';

import { Either, left, right } from '@core/either';
import { NotAllowedError } from '@core/errors/errors/not-allowed.error';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';

interface IDeleteQuestionUseCase {
	id: string;
	authorId: string;
}

type IDeleteQuestionUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{}
>;

export class DeleteQuestionCommentUseCase {
	constructor(
		private questionCommentsRepository: IQuestionCommentsRepository,
	) {}

	async execute({
		id,
		authorId,
	}: IDeleteQuestionUseCase): Promise<IDeleteQuestionUseCaseResponse> {
		const question = await this.questionCommentsRepository.findById(id);

		if (!question) {
			return left(new ResourceNotFoundError());
		}
		if (authorId !== question.authorId.toString()) {
			return left(new NotAllowedError());
		}
		await this.questionCommentsRepository.delete(question);

		return right({});
	}
}
