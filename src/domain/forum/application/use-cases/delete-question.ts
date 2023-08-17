import { IQuestionRepository } from '@domain-forum/application/repositories/question-repository.interface';

interface IDeleteQuestionUseCase {
	id: string;
	authorId: string;
}

interface IDeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
	constructor(private questionRepository: IQuestionRepository) {}

	async execute({
		id,
		authorId,
	}: IDeleteQuestionUseCase): Promise<IDeleteQuestionUseCaseResponse> {
		const question = await this.questionRepository.findById(id);

		if (!question) {
			throw new Error('Question not found.');
		}
		if (authorId !== question.id.toString()) {
			throw new Error('Not allowed.');
		}
		await this.questionRepository.delete(question);

		return {};
	}
}
