import { IAnswersRepository } from '@domain-forum/application/repositories/answers-repository.interface';

interface IDeleteAnswerUseCase {
	id: string;
	authorId: string;
}

interface IDeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
	constructor(private answersRepository: IAnswersRepository) {}

	async execute({
		id,
		authorId,
	}: IDeleteAnswerUseCase): Promise<IDeleteAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(id);

		if (!answer) {
			throw new Error('Answer not found.');
		}
		if (authorId !== answer.id.toString()) {
			throw new Error('Not allowed.');
		}
		await this.answersRepository.delete(answer);

		return {};
	}
}
