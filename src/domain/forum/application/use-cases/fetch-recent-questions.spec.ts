import { beforeEach, describe, expect, it, test } from 'vitest';

import { FetchRecentQuestionsUseCase } from '@domain-forum/application/use-cases/fetch-recent-questions';

import { makeQuestion } from '@tests/factories/make-question';
import { InMemoryQuestionRepository } from '@tests/repositories/in-memory-question-repository';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: FetchRecentQuestionsUseCase;

describe('Fetch recent questions', () => {
	beforeEach(() => {
		inMemoryQuestionRepository = new InMemoryQuestionRepository();
		sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository);
	});

	it('should be able to fetch recent questions', async () => {
		const dates = [
			new Date(2023, 0, 20),
			new Date(2023, 0, 18),
			new Date(2023, 0, 23),
		];

		for (const date of dates) {
			await inMemoryQuestionRepository.create(
				makeQuestion({ createdAt: date }),
			);
		}

		const { questions } = await sut.execute({ page: 1 });

		expect(questions).toEqual([
			expect.objectContaining({ createdAt: dates[2] }),
			expect.objectContaining({ createdAt: dates[0] }),
			expect.objectContaining({ createdAt: dates[1] }),
		]);
	});

	it('should be able to fetch paginated recent questions', async () => {
		const page = 2;

		for (let i = 0; i < 22; i++) {
			await inMemoryQuestionRepository.create(makeQuestion());
		}
		const { questions } = await sut.execute({ page });

		expect(questions).toHaveLength(2);
	});
});
