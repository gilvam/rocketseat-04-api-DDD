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
	test('UseCase be able to create an answer', async () => {
		const answerQuestion = new AnswerQuestionUseCase(
			inMemoryAnswersRepository,
		);
		const result = await answerQuestion.execute({
			instructorId: '1',
			questionId: '1',
			content: 'new answer',
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
	});
});
