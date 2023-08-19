import { beforeEach, describe, expect, test } from 'vitest';

import { DeleteQuestionUseCase } from '@domain-forum/application/use-cases/delete-question';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { makeQuestion } from '@tests/factories/make-question';
import { InMemoryQuestionRepository } from '@tests/repositories/in-memory-question-repository';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: DeleteQuestionUseCase;

describe('Delete question', () => {
	beforeEach(() => {
		inMemoryQuestionRepository = new InMemoryQuestionRepository();
		sut = new DeleteQuestionUseCase(inMemoryQuestionRepository);
	});

	test('UseCase be able to delete question', async () => {
		const id = 'question-1';
		const authorId = 'question-1';
		const newQuestion = makeQuestion({}, new UniqueEntityId(id));

		await inMemoryQuestionRepository.create(newQuestion);
		await sut.execute({ id, authorId });

		expect(inMemoryQuestionRepository.items).toHaveLength(0);
	});

	test('UseCase not be able to delete question', async () => {
		const id = 'question-1';
		const authorId = 'question-2';
		const newQuestion = makeQuestion({}, new UniqueEntityId(id));

		await inMemoryQuestionRepository.create(newQuestion);

		expect(async () => {
			return await sut.execute({ id, authorId });
		}).rejects.toBeInstanceOf(Error);
	});
});
