import { beforeEach, describe, expect, it } from 'vitest';

import { CreateQuestionUseCase } from '@domain-forum/application/use-cases/create-question';

import { InMemoryQuestionsRepository } from '@tests/repositories/in-memory-questions-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: CreateQuestionUseCase;

describe('Create question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new CreateQuestionUseCase(inMemoryQuestionsRepository);
	});

	it('UseCase be able to create a question', async () => {
		const { question } = await sut.execute({
			authorId: '1',
			title: 'New question',
			content: 'Content about the question',
		});

		expect(question.id).toBeTruthy();
		expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id);
	});
});
