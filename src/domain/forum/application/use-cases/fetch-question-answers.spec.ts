import { beforeEach, describe, expect, it } from 'vitest';

import { FetchQuestionAnswersUseCase } from '@domain-forum/application/use-cases/fetch-question-answers';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { makeAnswer } from '@tests/factories/make-answer';
import { InMemoryAnswersRepository } from '@tests/repositories/in-memory-answers-repository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

describe('Fetch question answers', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
	});

	it('should be able to fetch question answers', async () => {
		const id = 'question-1';
		const questionId = new UniqueEntityId(id);

		await inMemoryAnswersRepository.create(makeAnswer({ questionId }));
		await inMemoryAnswersRepository.create(makeAnswer({ questionId }));
		await inMemoryAnswersRepository.create(makeAnswer({ questionId }));
		const { answers } = await sut.execute({
			questionId: questionId.toString(),
			page: 1,
		});

		expect(answers).toHaveLength(3);
	});

	it('should be able to fetch paginated recent questions', async () => {
		const page = 2;
		const questionId = 'question-1';
		const questionIds = Array(22).fill(new UniqueEntityId(questionId));

		for (const questionId of questionIds) {
			await inMemoryAnswersRepository.create(makeAnswer({ questionId }));
		}
		const { answers } = await sut.execute({ questionId, page });

		expect(answers).toHaveLength(2);
	});
});
