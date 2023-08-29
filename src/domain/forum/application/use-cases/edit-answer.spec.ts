import { beforeEach, describe, expect, it } from 'vitest';

import { EditAnswerUseCase } from '@domain-forum/application/use-cases/edit-answer';

import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { NotAllowedError } from '@core/errors/errors/not-allowed.error';

import { makeAnswer } from '@tests/factories/make-answer';
import { makeAnswerAttachment } from '@tests/factories/make-question-attachment';
import { InMemoryAnswerAttachmentsRepository } from '@tests/repositories/in-memory-answer-attachments-repository';
import { InMemoryAnswersRepository } from '@tests/repositories/in-memory-answers-repository';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit answer', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository(
			inMemoryAnswerAttachmentsRepository,
		);
		inMemoryAnswerAttachmentsRepository =
			new InMemoryAnswerAttachmentsRepository();
		sut = new EditAnswerUseCase(
			inMemoryAnswersRepository,
			inMemoryAnswerAttachmentsRepository,
		);
	});

	it('UseCase be able to edit answer', async () => {
		const newAnswer = makeAnswer(
			{ authorId: new UniqueEntityId('author-1') },

			new UniqueEntityId('answer-1'),
		);

		await inMemoryAnswersRepository.create(newAnswer);
		inMemoryAnswerAttachmentsRepository.items.push(
			makeAnswerAttachment({
				answerId: newAnswer.id,
				attachmentId: new UniqueEntityId('1'),
			}),
			makeAnswerAttachment({
				answerId: newAnswer.id,
				attachmentId: new UniqueEntityId('2'),
			}),
		);

		await inMemoryAnswersRepository.create(newAnswer);
		await sut.execute({
			id: 'answer-1',
			authorId: 'author-1',
			content: 'content',
			attachmentIds: ['1', '3'],
		});

		expect(inMemoryAnswersRepository.items[0]).toMatchObject({
			content: 'content',
		});
		expect(
			inMemoryAnswersRepository.items[0].attachments.currentItems,
		).toHaveLength(2);
		expect(
			inMemoryAnswersRepository.items[0].attachments.currentItems,
		).toEqual([
			expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
			expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
		]);
	});

	it('UseCase not be able to edit answer', async () => {
		const newAnswer = makeAnswer({}, new UniqueEntityId());

		await inMemoryAnswersRepository.create(newAnswer);

		const result = await sut.execute({
			id: newAnswer.id.toString(),
			authorId: 'author-1',
			content: 'content',
			attachmentIds: [],
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
