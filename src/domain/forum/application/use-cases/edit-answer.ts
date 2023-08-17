import { IAnswersRepository } from '@domain-forum/application/repositories/answers-repository.interface';
import { Answer } from '@domain-forum/enterprise/entities/answer.model';

interface IEditAnswerUseCase {
	id: string;
	authorId: string;
	content: string;
}

interface IEditAnswerUseCaseResponse {
	answer: Answer;
}

export class EditAnswerUseCase {
	constructor(private answersRepository: IAnswersRepository) {}

	async execute({
		id,
		authorId,
		content,
	}: IEditAnswerUseCase): Promise<IEditAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(id);

		if (!answer) {
			throw new Error('Answer not found.');
		}
		if (authorId !== answer.authorId.toString()) {
			throw new Error('Not allowed.');
		}

		answer.content = content;

		await this.answersRepository.edit(answer);

		return { answer };
	}
}
