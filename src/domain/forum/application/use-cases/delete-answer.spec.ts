import { beforeEach, describe, expect, it } from 'vitest';

import { DeleteAnswerUseCase } from '@domain-forum/application/use-cases/delete-answer';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { makeAnswer } from '@tests/factories/make-answer';
import { InMemoryAnswersRepository } from '@tests/repositories/in-memory-answers-repository';

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe('Delete answer', () => {
	beforeEach(() => {
		inMemoryAnswerRepository = new InMemoryAnswersRepository();
		sut = new DeleteAnswerUseCase(inMemoryAnswerRepository);
	});

	it('UseCase be able to delete answer', async () => {
		const id = 'answer-1';
		const authorId = 'answer-1';
		const newAnswer = makeAnswer({}, new UniqueEntityId(id));

		await inMemoryAnswerRepository.create(newAnswer);
		await sut.execute({ id, authorId });

		expect(inMemoryAnswerRepository.items).toHaveLength(0);
	});

	it('UseCase not be able to delete answer', async () => {
		const id = 'answer-1';
		const authorId = 'answer-2';
		const newAnswer = makeAnswer({}, new UniqueEntityId(id));

		await inMemoryAnswerRepository.create(newAnswer);

		expect(async () => {
			return await sut.execute({ id, authorId });
		}).rejects.toBeInstanceOf(Error);
	});
});
