import { IAnswerCommentsRepository } from '@domain-forum/application/repositories/answer-comments-repository.interface';

interface IDeleteAnswerUseCase {
	id: string;
	authorId: string;
}

interface IDeleteAnswerUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
	constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

	async execute({
		id,
		authorId,
	}: IDeleteAnswerUseCase): Promise<IDeleteAnswerUseCaseResponse> {
		const answer = await this.answerCommentsRepository.findById(id);

		if (!answer) {
			throw new Error('Answer not found.');
		}
		if (authorId !== answer.authorId.toString()) {
			throw new Error('Not allowed.');
		}
		await this.answerCommentsRepository.delete(answer);

		return {};
	}
}
