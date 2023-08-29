import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';

import { Either, left, right } from '@core/either';
import { NotAllowedError } from '@core/errors/errors/not-allowed.error';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';

interface IDeleteQuestionUseCase {
	id: string;
	authorId: string;
}

type IDeleteQuestionUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{}
>;

export class DeleteQuestionUseCase {
	constructor(private questionsRepository: IQuestionsRepository) {}

	async execute({
		id,
		authorId,
	}: IDeleteQuestionUseCase): Promise<IDeleteQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(id);

		if (!question) {
			return left(new ResourceNotFoundError());
		}
		if (authorId !== question.id.toString()) {
			return left(new NotAllowedError());
		}
		await this.questionsRepository.delete(question);

		return right({});
	}
}
