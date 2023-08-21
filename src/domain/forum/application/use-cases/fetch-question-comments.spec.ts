import { beforeEach, describe, expect, it } from 'vitest';

import { FetchQuestionCommentsUseCase } from '@domain-forum/application/use-cases/fetch-question-comments';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { makeAnswer } from '@tests/factories/make-answer';
import { makeQuestionComment } from '@tests/factories/make-question-comment';
import { InMemoryQuestionCommentsRepository } from '@tests/repositories/in-memory-question-comments-repository';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

describe('Fetch question comments', () => {
	beforeEach(() => {
		inMemoryQuestionCommentsRepository =
			new InMemoryQuestionCommentsRepository();
		sut = new FetchQuestionCommentsUseCase(
			inMemoryQuestionCommentsRepository,
		);
	});

	it('should be able to fetch question comment', async () => {
		const id = 'question-1';
		const questionId = new UniqueEntityId(id);

		await inMemoryQuestionCommentsRepository.create(
			makeQuestionComment({ questionId }),
		);
		await inMemoryQuestionCommentsRepository.create(
			makeQuestionComment({ questionId }),
		);
		await inMemoryQuestionCommentsRepository.create(
			makeQuestionComment({ questionId }),
		);
		const { questionComments } = await sut.execute({
			questionId: questionId.toString(),
			page: 1,
		});

		expect(questionComments).toHaveLength(3);
	});

	it('should be able to fetch paginated recent questions', async () => {
		const page = 2;
		const questionId = 'question-1';
		const questionIds = Array(22).fill(new UniqueEntityId(questionId));

		for (const questionId of questionIds) {
			await inMemoryQuestionCommentsRepository.create(
				makeQuestionComment({ questionId }),
			);
		}
		const { questionComments } = await sut.execute({ questionId, page });

		expect(questionComments).toHaveLength(2);
	});
});
