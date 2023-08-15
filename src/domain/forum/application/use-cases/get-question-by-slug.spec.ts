import { beforeEach, describe, expect, test } from 'vitest';

import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { GetQuestionBySlug } from '@domain-forum/application/use-cases/get-question-by-slug';
import { Question } from '@domain-forum/enterprise/entities/question.model';

import { InMemoryQuestionRepository } from '@tests/repositories/in-memory-question-repository';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: GetQuestionBySlug;

describe('Find question by slug', () => {
	beforeEach(() => {
		inMemoryQuestionRepository = new InMemoryQuestionRepository();
		sut = new GetQuestionBySlug(inMemoryQuestionRepository);
	});
	test('Should be able to get a question by slug', async () => {
		const newQuestion = Question.create({
			authorId: new UniqueEntityId('1'),
			title: 'Example question',
			content: 'Example content',
		});

		await inMemoryQuestionRepository.create(newQuestion);

		const { question } = await sut.execute({
			slug: 'example-question',
		});

		expect(question.id).toBeTruthy();
		expect(question.title).toEqual(newQuestion.title);
	});
});
