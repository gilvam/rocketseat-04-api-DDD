import { IAnswerCommentsRepository } from '@domain-forum/application/repositories/answer-comments-repository.interface';
import { NotAllowedError } from '@domain-forum/application/use-cases/_errors/not-allowed.error';
import { ResourceNotFoundError } from '@domain-forum/application/use-cases/_errors/resource-not-found.error';

import { Either, left, right } from '@core/either';

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
