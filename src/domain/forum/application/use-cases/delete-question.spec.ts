import { beforeEach, describe, expect, it } from 'vitest';

import { NotAllowedError } from '@domain-forum/application/use-cases/_errors/not-allowed.error';
import { DeleteQuestionUseCase } from '@domain-forum/application/use-cases/delete-question';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { makeQuestionAttachment } from '@tests/factories/make-answer-attachment';
import { makeQuestion } from '@tests/factories/make-question';
import { InMemoryQuestionAttachmentsRepository } from '@tests/repositories/in-memory-question-attachments-repository';
import { InMemoryQuestionsRepository } from '@tests/repositories/in-memory-questions-repository';

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase;

describe('Delete question', () => {
	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository =
			new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentsRepository,
		);
		sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
	});

	it('UseCase be able to delete question', async () => {
		const id = 'question-1';
		const authorId = 'question-1';
		const newQuestion = makeQuestion({}, new UniqueEntityId(id));

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
		await sut.execute({ id, authorId });

		expect(inMemoryQuestionsRepository.items).toHaveLength(0);
		expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(0);
	});

	it('UseCase not be able to delete question', async () => {
		const id = 'question-1';
		const authorId = 'question-2';
		const newQuestion = makeQuestion({}, new UniqueEntityId(id));

		await inMemoryQuestionsRepository.create(newQuestion);
		const result = await sut.execute({ id, authorId });

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
