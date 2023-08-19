import { beforeEach, describe, expect, test } from 'vitest';

import { EditQuestionUseCase } from '@domain-forum/application/use-cases/edit-question';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { makeQuestion } from '@tests/factories/make-question';
import { InMemoryQuestionRepository } from '@tests/repositories/in-memory-question-repository';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: EditQuestionUseCase;

describe('Edit question', () => {
	beforeEach(() => {
		inMemoryQuestionRepository = new InMemoryQuestionRepository();
		sut = new EditQuestionUseCase(inMemoryQuestionRepository);
	});

	test('UseCase be able to edit question', async () => {
		const newQuestion = makeQuestion(
			{ authorId: new UniqueEntityId('author-1') },

			new UniqueEntityId('question-1'),
		);

		await inMemoryQuestionRepository.create(newQuestion);
		await sut.execute({
			id: 'question-1',
			authorId: 'author-1',
			content: 'content',
			title: 'title',
		});

		expect(inMemoryQuestionRepository.items[0]).toMatchObject({
			content: 'content',
			title: 'title',
		});
	});

	test('UseCase not be able to edit question', async () => {
		const newQuestion = makeQuestion({}, new UniqueEntityId());

		await inMemoryQuestionRepository.create(newQuestion);

		expect(async () => {
			return await sut.execute({
				id: newQuestion.id.toString(),
				authorId: 'author-1',
				content: 'content',
				title: 'title',
			});
		}).rejects.toBeInstanceOf(Error);
	});
});
