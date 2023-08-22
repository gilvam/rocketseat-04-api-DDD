import { beforeEach, describe, expect, it } from 'vitest';

import { NotAllowedError } from '@domain-forum/application/use-cases/_errors/not-allowed.error';
import { EditQuestionUseCase } from '@domain-forum/application/use-cases/edit-question';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { makeQuestion } from '@tests/factories/make-question';
import { InMemoryQuestionsRepository } from '@tests/repositories/in-memory-questions-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
	});

	it('UseCase be able to edit question', async () => {
		const newQuestion = makeQuestion(
			{ authorId: new UniqueEntityId('author-1') },

			new UniqueEntityId('question-1'),
		);

		await inMemoryQuestionsRepository.create(newQuestion);
		await sut.execute({
			id: 'question-1',
			authorId: 'author-1',
			content: 'content',
			title: 'title',
		});

		expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
			content: 'content',
			title: 'title',
		});
	});

	it('UseCase not be able to edit question', async () => {
		const newQuestion = makeQuestion({}, new UniqueEntityId());

		await inMemoryQuestionsRepository.create(newQuestion);

		const result = await sut.execute({
			id: newQuestion.id.toString(),
			authorId: 'author-1',
			content: 'content',
			title: 'title',
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
