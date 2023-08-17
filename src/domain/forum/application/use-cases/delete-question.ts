import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';

interface IDeleteQuestionUseCase {
	id: string;
	authorId: string;
}

interface IDeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
	constructor(private questionsRepository: IQuestionsRepository) {}

	async execute({
		id,
		authorId,
	}: IDeleteQuestionUseCase): Promise<IDeleteQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(id);

		if (!question) {
			throw new Error('Question not found.');
		}
		if (authorId !== question.id.toString()) {
			throw new Error('Not allowed.');
		}
		await this.questionsRepository.delete(question);

		return {};
	}
}
