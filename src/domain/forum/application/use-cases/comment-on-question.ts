import { IQuestionCommentsRepository } from '@domain-forum/application/repositories/question-comments-repository.interface';
import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { QuestionComment } from '@domain-forum/enterprise/entities/question-comment.model';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

interface ICommentOnQuestionUseCase {
	authorId: string;
	questionId: string;
	content: string;
}

interface ICommentOnQuestionUseCaseResponse {
	questionComment: QuestionComment;
}

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
			throw new Error('Question not found.');
		}

		const questionComment = await QuestionComment.create({
			authorId: new UniqueEntityId(authorId),
			questionId: new UniqueEntityId(questionId),
			content,
		});
		await this.questionCommentsRepository.create(questionComment);

		return { questionComment };
	}
}
