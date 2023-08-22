import { IQuestionCommentsRepository } from '@domain-forum/application/repositories/question-comments-repository.interface';
import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { ResourceNotFoundError } from '@domain-forum/application/use-cases/_errors/resource-not-found.error';
import { QuestionComment } from '@domain-forum/enterprise/entities/question-comment.model';

import { Either, left, right } from '@core/either';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

interface ICommentOnQuestionUseCase {
	authorId: string;
	questionId: string;
	content: string;
}

type ICommentOnQuestionUseCaseResponse = Either<
	ResourceNotFoundError,
	{
		questionComment: QuestionComment;
	}
>;

export class CommentOnQuestionUseCase {
	constructor(
		private questionsRepository: IQuestionsRepository,
		private questionCommentsRepository: IQuestionCommentsRepository,
	) {}

	async execute({
		authorId,
		questionId,
		content,
	}: ICommentOnQuestionUseCase): Promise<ICommentOnQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(questionId);
		if (!question) {
			return left(new ResourceNotFoundError());
		}

		const questionComment = await QuestionComment.create({
			authorId: new UniqueEntityId(authorId),
			questionId: new UniqueEntityId(questionId),
			content,
		});
		await this.questionCommentsRepository.create(questionComment);

		return right({ questionComment });
	}
}
