import { IAnswersRepository } from '@domain-forum/application/repositories/answers-repository.interface';
import { NotAllowedError } from '@domain-forum/application/use-cases/_errors/not-allowed.error';
import { ResourceNotFoundError } from '@domain-forum/application/use-cases/_errors/resource-not-found.error';

import { Either, left, right } from '@core/either';

interface IDeleteAnswerUseCase {
	id: string;
	authorId: string;
}

type IDeleteAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{}
>;

export class DeleteAnswerUseCase {
	constructor(private answersRepository: IAnswersRepository) {}

	async execute({
		id,
		authorId,
	}: IDeleteAnswerUseCase): Promise<IDeleteAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(id);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}
		if (authorId !== answer.id.toString()) {
			return left(new NotAllowedError());
		}
		await this.answersRepository.delete(answer);

		return right({});
	}
}
