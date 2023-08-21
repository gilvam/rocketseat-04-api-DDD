import { beforeEach, describe, expect, it } from 'vitest';

import { FetchAnswerCommentsUseCase } from '@domain-forum/application/use-cases/fetch-answer-comments';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { makeAnswerComment } from '@tests/factories/make-answer-comment';
import { InMemoryAnswerCommentsRepository } from '@tests/repositories/in-memory-answer-comments-repository';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsUseCase;

describe('Fetch answer comments', () => {
	beforeEach(() => {
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
	});

	it('should be able to fetch answer comment', async () => {
		const id = 'answer-1';
		const answerId = new UniqueEntityId(id);

		await inMemoryAnswerCommentsRepository.create(
			makeAnswerComment({ answerId }),
		);
		await inMemoryAnswerCommentsRepository.create(
			makeAnswerComment({ answerId }),
		);
		await inMemoryAnswerCommentsRepository.create(
			makeAnswerComment({ answerId }),
		);
		const { answerComments } = await sut.execute({
			answerId: answerId.toString(),
			page: 1,
		});

		expect(answerComments).toHaveLength(3);
	});

	it('should be able to fetch paginated recent answers', async () => {
		const page = 2;
		const answerId = 'answer-1';
		const answerIds = Array(22).fill(new UniqueEntityId(answerId));

		for (const answerId of answerIds) {
			await inMemoryAnswerCommentsRepository.create(
				makeAnswerComment({ answerId }),
			);
		}
		const { answerComments } = await sut.execute({ answerId, page });

		expect(answerComments).toHaveLength(2);
	});
});
