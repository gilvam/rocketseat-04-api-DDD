import { IAnswerCommentsRepository } from '@domain-forum/application/repositories/answer-comments-repository.interface';

import { Either, left, right } from '@core/either';
import { NotAllowedError } from '@core/errors/errors/not-allowed.error';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';

interface IDeleteAnswerUseCase {
	id: string;
	authorId: string;
}

type IDeleteAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{}
>;

export class DeleteAnswerCommentUseCase {
	constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

	async execute({
		id,
		authorId,
	}: IDeleteAnswerUseCase): Promise<IDeleteAnswerUseCaseResponse> {
		const answer = await this.answerCommentsRepository.findById(id);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}
		if (authorId !== answer.authorId.toString()) {
			return left(new NotAllowedError());
		}
		await this.answerCommentsRepository.delete(answer);

		return right({});
	}
}
