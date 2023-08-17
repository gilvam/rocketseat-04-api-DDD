import { beforeEach, describe, expect, test } from 'vitest';

import { EditAnswerUseCase } from '@domain-forum/application/use-cases/edit-answer';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { makeAnswer } from '@tests/factories/make-answer';
import { InMemoryAnswersRepository } from '@tests/repositories/in-memory-answers-repository';

let inMemoryAnswerRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit answer', () => {
	beforeEach(() => {
		inMemoryAnswerRepository = new InMemoryAnswersRepository();
		sut = new EditAnswerUseCase(inMemoryAnswerRepository);
	});

	test('Should be able to edit answer', async () => {
		const newAnswer = makeAnswer(
			{ authorId: new UniqueEntityId('author-1') },

			new UniqueEntityId('answer-1'),
		);

		await inMemoryAnswerRepository.create(newAnswer);
		await sut.execute({
			id: 'answer-1',
			authorId: 'author-1',
			content: 'content',
		});

		expect(inMemoryAnswerRepository.items[0]).toMatchObject({
			content: 'content',
		});
	});

	test('Should not be able to edit answer', async () => {
		const newAnswer = makeAnswer({}, new UniqueEntityId());

		await inMemoryAnswerRepository.create(newAnswer);

		expect(async () => {
			return await sut.execute({
				id: newAnswer.id.toString(),
				authorId: 'author-1',
				content: 'content',
			});
		}).rejects.toBeInstanceOf(Error);
	});
});
