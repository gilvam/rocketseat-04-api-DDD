import { beforeEach, describe, expect, it } from 'vitest';

import { FetchQuestionAnswersUseCase } from '@domain-forum/application/use-cases/fetch-question-answers';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { makeAnswer } from '@tests/factories/make-answer';
import { InMemoryAnswerAttachmentsRepository } from '@tests/repositories/in-memory-answer-attachments-repository';
import { InMemoryAnswersRepository } from '@tests/repositories/in-memory-answers-repository';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

describe('Fetch question answers', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository(
			inMemoryAnswerAttachmentsRepository,
		);
		sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
	});

	it('should be able to fetch question answers', async () => {
		const id = 'question-1';
		const questionId = new UniqueEntityId(id);

		await inMemoryAnswersRepository.create(makeAnswer({ questionId }));
		await inMemoryAnswersRepository.create(makeAnswer({ questionId }));
		await inMemoryAnswersRepository.create(makeAnswer({ questionId }));
		const result = await sut.execute({
			questionId: questionId.toString(),
			page: 1,
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value?.answers).toHaveLength(3);
	});

	it('should be able to fetch paginated recent questions', async () => {
		const page = 2;
		const questionId = 'question-1';
		const questionIds = Array(22).fill(new UniqueEntityId(questionId));

		for (const questionId of questionIds) {
			await inMemoryAnswersRepository.create(makeAnswer({ questionId }));
		}
		const result = await sut.execute({ questionId, page });

		expect(result.isRight()).toBeTruthy();
		expect(result.value?.answers).toHaveLength(2);
	});
});
