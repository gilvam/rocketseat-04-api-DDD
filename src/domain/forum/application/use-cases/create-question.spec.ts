import { beforeEach, describe, expect, test } from 'vitest';

import { CreateQuestionUseCase } from '@domain-forum/application/use-cases/create-question';

import { InMemoryQuestionRepository } from '@tests/repositories/in-memory-question-repository';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: CreateQuestionUseCase;

describe('Create question', () => {
	beforeEach(() => {
		inMemoryQuestionRepository = new InMemoryQuestionRepository();
		sut = new CreateQuestionUseCase(inMemoryQuestionRepository);
	});
	test('UseCase be able to create a question', async () => {
		const { question } = await sut.execute({
			authorId: '1',
			title: 'New question',
			content: 'Content about the question',
		});

		expect(question.id).toBeTruthy();
		expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id);
	});
});
