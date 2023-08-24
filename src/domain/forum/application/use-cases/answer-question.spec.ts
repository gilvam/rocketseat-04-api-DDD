import { beforeEach, describe, expect, test } from 'vitest';

import { AnswerQuestionUseCase } from '@domain-forum/application/use-cases/answer-question';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { InMemoryAnswerAttachmentsRepository } from '@tests/repositories/in-memory-answer-attachments-repository';
import { InMemoryAnswersRepository } from '@tests/repositories/in-memory-answers-repository';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Create an answer', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository(
			inMemoryAnswerAttachmentsRepository,
		);
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
			attachmentIds: ['1', '2'],
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
		expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer);
		expect(
			inMemoryAnswersRepository.items[0].attachments.currentItems,
		).toHaveLength(2);
		expect(
			inMemoryAnswersRepository.items[0].attachments.currentItems,
		).toEqual([
			expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
			expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
		]);
	});
});
