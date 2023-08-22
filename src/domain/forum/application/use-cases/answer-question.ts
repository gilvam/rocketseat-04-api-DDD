import { IAnswersRepository } from '@domain-forum/application/repositories/answers-repository.interface';
import { Answer } from '@domain-forum/enterprise/entities/answer.model';

import { Either, right } from '@core/either';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

interface IAnswerQuestionUseCase {
	instructorId: string;
	questionId: string;
	content: string;
}

type IAnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>;

export class AnswerQuestionUseCase {
	constructor(private answersRepository: IAnswersRepository) {}

	async execute({
		instructorId,
		questionId,
		content,
	}: IAnswerQuestionUseCase): Promise<IAnswerQuestionUseCaseResponse> {
		const answer = Answer.create({
			content,
			authorId: new UniqueEntityId(instructorId),
			questionId: new UniqueEntityId(questionId),
		});

		await this.answersRepository.create(answer);

		return right({ answer });
	}
}
