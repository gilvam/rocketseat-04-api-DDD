import { IAnswerCommentsRepository } from '@domain-forum/application/repositories/answer-comments-repository.interface';
import { IAnswersRepository } from '@domain-forum/application/repositories/answers-repository.interface';
import { AnswerComment } from '@domain-forum/enterprise/entities/answer-comment.model';

import { Either, left, right } from '@core/either';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';

interface ICommentOnAnswerUseCase {
	authorId: string;
	answerId: string;
	content: string;
}

type ICommentOnAnswerUseCaseResponse = Either<
	ResourceNotFoundError,
	{ answerComment: AnswerComment }
>;

export class CommentOnAnswerUseCase {
	constructor(
		private answersRepository: IAnswersRepository,
		private answerCommentsRepository: IAnswerCommentsRepository,
	) {}

	async execute({
		authorId,
		answerId,
		content,
	}: ICommentOnAnswerUseCase): Promise<ICommentOnAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(answerId);
		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		const answerComment = await AnswerComment.create({
			authorId: new UniqueEntityId(authorId),
			answerId: new UniqueEntityId(answerId),
			content,
		});
		await this.answerCommentsRepository.create(answerComment);

		return right({ answerComment });
	}
}
