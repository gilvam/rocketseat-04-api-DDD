import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { NotAllowedError } from '@domain-forum/application/use-cases/_errors/not-allowed.error';
import { ResourceNotFoundError } from '@domain-forum/application/use-cases/_errors/resource-not-found.error';
import { Question } from '@domain-forum/enterprise/entities/question.model';

import { Either, left, right } from '@core/either';

interface IEditQuestionUseCase {
	id: string;
	authorId: string;
	title: string;
	content: string;
}

type IEditQuestionUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		question: Question;
	}
>;

export class EditQuestionUseCase {
	constructor(private questionsRepository: IQuestionsRepository) {}

	async execute({
		id,
		authorId,
		title,
		content,
	}: IEditQuestionUseCase): Promise<IEditQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(id);

		if (!question) {
			return left(new ResourceNotFoundError());
		}
		if (authorId !== question.authorId.toString()) {
			return left(new NotAllowedError());
		}

		question.title = title;
		question.content = content;

		await this.questionsRepository.edit(question);

		return right({ question });
	}
}
