import { beforeEach, describe, expect, it } from 'vitest';

import { NotAllowedError } from '@domain-forum/application/use-cases/_errors/not-allowed.error';
import { EditQuestionUseCase } from '@domain-forum/application/use-cases/edit-question';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { makeQuestionAttachment } from '@tests/factories/make-answer-attachment';
import { makeQuestion } from '@tests/factories/make-question';
import { InMemoryQuestionAttachmentsRepository } from '@tests/repositories/in-memory-question-attachments-repository';
import { InMemoryQuestionsRepository } from '@tests/repositories/in-memory-questions-repository';

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentsRepository,
		);
		inMemoryQuestionAttachmentsRepository =
			new InMemoryQuestionAttachmentsRepository();

		sut = new EditQuestionUseCase(
			inMemoryQuestionsRepository,
			inMemoryQuestionAttachmentsRepository,
		);
	});

	it('UseCase be able to edit question', async () => {
		const newQuestion = makeQuestion(
			{ authorId: new UniqueEntityId('author-1') },

			new UniqueEntityId('question-1'),
		);

		await inMemoryQuestionsRepository.create(newQuestion);
		inMemoryQuestionAttachmentsRepository.items.push(
			makeQuestionAttachment({
				questionId: newQuestion.id,
				attachmentId: new UniqueEntityId('1'),
			}),
			makeQuestionAttachment({
				questionId: newQuestion.id,
				attachmentId: new UniqueEntityId('2'),
			}),
		);

		await sut.execute({
			id: 'question-1',
			authorId: 'author-1',
			content: 'content',
			title: 'title',
			attachmentIds: ['1', '3'],
		});

		expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
			content: 'content',
			title: 'title',
		});
		expect(
			inMemoryQuestionsRepository.items[0].attachments.currentItems,
		).toHaveLength(2);
		expect(
			inMemoryQuestionsRepository.items[0].attachments.currentItems,
		).toEqual([
			expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
			expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
		]);
	});

	it('UseCase not be able to edit question', async () => {
		const newQuestion = makeQuestion({}, new UniqueEntityId());

		await inMemoryQuestionsRepository.create(newQuestion);

		const result = await sut.execute({
			id: newQuestion.id.toString(),
			authorId: 'author-1',
			content: 'content',
			title: 'title',
			attachmentIds: [],
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
