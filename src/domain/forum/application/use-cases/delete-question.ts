import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { NotAllowedError } from '@domain-forum/application/use-cases/_errors/not-allowed.error';
import { ResourceNotFoundError } from '@domain-forum/application/use-cases/_errors/resource-not-found.error';

import { Either, left, right } from '@core/either';

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
