import { IAnswersRepository } from '@domain-forum/application/repositories/answers-repository.interface';
import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { NotAllowedError } from '@domain-forum/application/use-cases/_errors/not-allowed.error';
import { ResourceNotFoundError } from '@domain-forum/application/use-cases/_errors/resource-not-found.error';
import { Question } from '@domain-forum/enterprise/entities/question.model';

import { Either, left, right } from '@core/either';

interface IChooseQuestionBestAnswer {
	authorId: string;
	answerId: string;
}

type IChooseQuestionBestAnswerResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{ question: Question }
>;

export class ChooseQuestionBestAnswerUserCase {
	constructor(
		private questionsRepository: IQuestionsRepository,
		private answersRepository: IAnswersRepository,
	) {}

	async execute({
		authorId,
		answerId,
	}: IChooseQuestionBestAnswer): Promise<IChooseQuestionBestAnswerResponse> {
		const answer = await this.answersRepository.findById(answerId);
		if (!answer) {
			return left(new ResourceNotFoundError());
		}

		const question = await this.questionsRepository.findById(
			answer.questionId.toString(),
		);
		if (!question) {
			return left(new ResourceNotFoundError());
		}

		if (authorId !== question.authorId.toString()) {
			return left(new NotAllowedError());
		}

		question.bestAnswerId = answer.id;

		await this.questionsRepository.edit(question);

		return right({ question });
	}
}
