import { expect, test } from 'vitest';
import { AnswerQuestionUseCase } from './answer-question';
import { IAnswersRepository } from '@repositories/AnswersRepository';
import { Answer } from '@entities/answer.model';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

const fakeAnswersRepository: IAnswersRepository = {
	create: async (answer: Answer) => {},
};

test('Create a answer', async () => {
	const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);
	const answer = await answerQuestion.execute({
		instructorId: new UniqueEntityId('1').toString(),
		questionId: new UniqueEntityId('1').toString(),
		content: 'new answer',
	});

	expect(answer.content).toEqual('new answer');
});
