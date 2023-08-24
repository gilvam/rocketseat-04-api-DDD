import { beforeEach, describe, expect, it } from 'vitest';

import { CreateQuestionUseCase } from '@domain-forum/application/use-cases/create-question';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { InMemoryQuestionAttachmentsRepository } from '@tests/repositories/in-memory-question-attachments-repository';
import { InMemoryQuestionsRepository } from '@tests/repositories/in-memory-questions-repository';

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe('Create question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentsRepository,
		);
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
	});

	it('UseCase be able to create a question', async () => {
		const result = await sut.execute({
			authorId: '1',
			title: 'New question',
			content: 'Content about the question',
			attachmentIds: ['1', '2'],
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryQuestionsRepository.items[0]).toEqual(
			result.value?.question,
		);
		expect(
			inMemoryQuestionsRepository.items[0].attachments.currentItems,
		).toHaveLength(2);
		expect(
			inMemoryQuestionsRepository.items[0].attachments.currentItems,
		).toEqual([
			expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
			expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
		]);
	});
});
