import { beforeEach, describe, expect, it } from 'vitest';

import { DeleteQuestionUseCase } from '@domain-forum/application/use-cases/delete-question';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { makeQuestion } from '@tests/factories/make-question';
import { InMemoryQuestionsRepository } from '@tests/repositories/in-memory-questions-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe('Delete question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
	});

	it('UseCase be able to delete question', async () => {
		const id = 'question-1';
		const authorId = 'question-1';
		const newQuestion = makeQuestion({}, new UniqueEntityId(id));

		await inMemoryQuestionsRepository.create(newQuestion);
		await sut.execute({ id, authorId });

		expect(inMemoryQuestionsRepository.items).toHaveLength(0);
	});

	it('UseCase not be able to delete question', async () => {
		const id = 'question-1';
		const authorId = 'question-2';
		const newQuestion = makeQuestion({}, new UniqueEntityId(id));

		await inMemoryQuestionsRepository.create(newQuestion);

		expect(async () => {
			return await sut.execute({ id, authorId });
		}).rejects.toBeInstanceOf(Error);
	});
});
