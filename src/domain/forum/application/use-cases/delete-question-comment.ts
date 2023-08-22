import { IQuestionCommentsRepository } from '@domain-forum/application/repositories/question-comments-repository.interface';
import { NotAllowedError } from '@domain-forum/application/use-cases/_errors/not-allowed.error';
import { ResourceNotFoundError } from '@domain-forum/application/use-cases/_errors/resource-not-found.error';

import { Either, left, right } from '@core/either';

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
