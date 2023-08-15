import { Answer } from '@entities/answer.model';
import { IAnswersRepository } from '@repositories/AnswersRepository';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

interface IAnswerQuestionUseCase {
	instructorId: string;
	questionId: string;
	content: string;
}

export class AnswerQuestionUseCase {
	constructor(private answersRepository: IAnswersRepository) {}

	async execute({
		instructorId,
		questionId,
		content,
	}: IAnswerQuestionUseCase) {
		const answer = Answer.create({
			content,
			authorId: new UniqueEntityId(instructorId),
			questionId: new UniqueEntityId(questionId),
		});

		await this.answersRepository.create(answer);

		return answer;
	}
}
