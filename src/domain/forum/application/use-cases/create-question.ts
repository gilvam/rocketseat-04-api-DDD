import { IQuestionRepository } from '@domain-forum/application/repositories/question-repository.interface';
import { Question } from '@domain-forum/enterprise/entities/question.model';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

interface ICreateQuestionUseCase {
	authorId: string;
	title: string;
	content: string;
}

interface ICreateQuestionUseCaseResponse {
	question: Question;
}

export class CreateQuestionUseCase {
	constructor(private questionRepository: IQuestionRepository) {}

	async execute({
		authorId,
		title,
		content,
	}: ICreateQuestionUseCase): Promise<ICreateQuestionUseCaseResponse> {
		const question = Question.create({
			authorId: new UniqueEntityId(authorId),
			title,
			content,
		});

		await this.questionRepository.create(question);

		return { question };
	}
}
