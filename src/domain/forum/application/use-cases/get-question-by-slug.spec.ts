import { beforeEach, describe, expect, it } from 'vitest';

import { GetQuestionBySlugUseCase } from '@domain-forum/application/use-cases/get-question-by-slug';

import { makeQuestion } from '@tests/factories/make-question';
import { InMemoryQuestionsRepository } from '@tests/repositories/in-memory-questions-repository';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase;

describe('Find question by slug', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
		sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
	});

	it('UseCase be able to get a question by slug', async () => {
		const title = 'Example Question';
		const newQuestion = makeQuestion({ title });

		await inMemoryQuestionsRepository.create(newQuestion);

		const result = await sut.execute({
			slug: 'example-question',
		});

		expect(result.isRight()).toBeTruthy();
		expect(result.value?.question.id).toBeTruthy();
		expect(result.value?.question.title).toEqual(newQuestion.title);
	});
});
