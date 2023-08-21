import { IQuestionCommentsRepository } from '@domain-forum/application/repositories/question-comments-repository.interface';

interface IDeleteQuestionUseCase {
	id: string;
	authorId: string;
}

interface IDeleteQuestionUseCaseResponse {}

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
			throw new Error('Question not found.');
		}
		if (authorId !== question.authorId.toString()) {
			throw new Error('Not allowed.');
		}
		await this.questionCommentsRepository.delete(question);

		return {};
	}
}
