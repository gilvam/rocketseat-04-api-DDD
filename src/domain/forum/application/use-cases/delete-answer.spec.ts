import { beforeEach, describe, expect, it } from 'vitest';

import { DeleteAnswerUseCase } from '@domain-forum/application/use-cases/delete-answer';

import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { NotAllowedError } from '@core/errors/errors/not-allowed.error';

import { makeAnswer } from '@tests/factories/make-answer';
import { makeAnswerAttachment } from '@tests/factories/make-question-attachment';
import { InMemoryAnswerAttachmentsRepository } from '@tests/repositories/in-memory-answer-attachments-repository';
import { InMemoryAnswersRepository } from '@tests/repositories/in-memory-answers-repository';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase;

describe('Delete answer', () => {
	beforeEach(() => {
		inMemoryAnswerAttachmentsRepository =
			new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(
			inMemoryAnswerAttachmentsRepository,
		);
		sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
	});

	it('UseCase be able to delete answer', async () => {
		const id = 'answer-1';
		const authorId = 'answer-1';
		const newAnswer = makeAnswer({}, new UniqueEntityId(id));

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
		await sut.execute({ id, authorId });

		expect(inMemoryAnswersRepository.items).toHaveLength(0);
		expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0);
	});

	it('UseCase not be able to delete answer', async () => {
		const id = 'answer-1';
		const authorId = 'answer-2';
		const newAnswer = makeAnswer({}, new UniqueEntityId(id));

		await inMemoryAnswersRepository.create(newAnswer);
		const result = await sut.execute({ id, authorId });

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
