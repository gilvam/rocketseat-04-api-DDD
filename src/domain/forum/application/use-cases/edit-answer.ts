import { IAnswersRepository } from '@domain-forum/application/repositories/answers-repository.interface';
import { NotAllowedError } from '@domain-forum/application/use-cases/_errors/not-allowed.error';
import { ResourceNotFoundError } from '@domain-forum/application/use-cases/_errors/resource-not-found.error';
import { Answer } from '@domain-forum/enterprise/entities/answer.model';

import { Either, left, right } from '@core/either';

interface IEditAnswerUseCase {
	id: string;
	authorId: string;
	content: string;
}

type IEditAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		answer: Answer;
	}
>;

export class EditAnswerUseCase {
	constructor(private answersRepository: IAnswersRepository) {}

	async execute({
		id,
		authorId,
		content,
	}: IEditAnswerUseCase): Promise<IEditAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(id);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}
		if (authorId !== answer.authorId.toString()) {
			return left(new NotAllowedError());
		}

		answer.content = content;

		await this.answersRepository.edit(answer);

		return right({ answer });
	}
}
