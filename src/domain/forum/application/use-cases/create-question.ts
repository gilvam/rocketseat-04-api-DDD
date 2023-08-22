import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { Question } from '@domain-forum/enterprise/entities/question.model';

import { Either, right } from '@core/either';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

interface ICreateQuestionUseCase {
	authorId: string;
	title: string;
	content: string;
}

type ICreateQuestionUseCaseResponse = Either<
	null,
	{
		question: Question;
	}
>;

export class CreateQuestionUseCase {
	constructor(private questionsRepository: IQuestionsRepository) {}

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

		await this.questionsRepository.create(question);

		return right({ question });
	}
}
