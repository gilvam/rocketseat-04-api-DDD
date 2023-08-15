import { beforeEach, describe, expect, test } from 'vitest';

import { AnswerQuestionUseCase } from '@domain-forum/application/use-cases/answer-question';

import { InMemoryAnswersRepository } from '@tests/repositories/in-memory-answers-repository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Create an answer', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
	});
	test('Should be able to create an answer', async () => {
		const answerQuestion = new AnswerQuestionUseCase(
			inMemoryAnswersRepository,
		);
		const { answer } = await answerQuestion.execute({
			instructorId: '1',
			questionId: '1',
			content: 'new answer',
		});

		expect(answer.id).toBeTruthy();
		expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id);
	});
});
