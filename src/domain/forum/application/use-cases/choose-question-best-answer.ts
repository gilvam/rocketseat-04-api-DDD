import { IAnswersRepository } from '@domain-forum/application/repositories/answers-repository.interface';
import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { Question } from '@domain-forum/enterprise/entities/question.model';

interface IChooseQuestionBestAnswer {
	authorId: string;
	answerId: string;
}

interface IChooseQuestionBestAnswerResponse {
	question: Question;
}

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
			throw new Error('Answer not found.');
		}

		const question = await this.questionsRepository.findById(
			answer.questionId.toString(),
		);
		if (!question) {
			throw new Error('Question not found.');
		}

		if (authorId !== question.authorId.toString()) {
			throw new Error('Not allowed');
		}

		question.bestAnswerId = answer.id;

		await this.questionsRepository.edit(question);

		return { question };
	}
}
