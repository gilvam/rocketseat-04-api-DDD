import { beforeEach, describe, expect, it } from 'vitest';

import { NotAllowedError } from '@domain-forum/application/use-cases/_errors/not-allowed.error';
import { DeleteAnswerCommentUseCase } from '@domain-forum/application/use-cases/delete-answer-comment';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { makeAnswerComment } from '@tests/factories/make-answer-comment';
import { InMemoryAnswerCommentsRepository } from '@tests/repositories/in-memory-answer-comments-repository';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe('Delete answer comment', () => {
	beforeEach(() => {
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
	});

	it('should be able to delete a answer comment', async () => {
		const answerComment = makeAnswerComment();

		await inMemoryAnswerCommentsRepository.create(answerComment);
		await sut.execute({
			id: answerComment.id.toString(),
			authorId: answerComment.authorId.toString(),
		});

		expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
	});

	it('should not be able to delete a answer comment', async () => {
		const answerComment = makeAnswerComment({
			authorId: new UniqueEntityId('author-1'),
		});

		await inMemoryAnswerCommentsRepository.create(answerComment);

		const result = await sut.execute({
			id: answerComment.id.toString(),
			authorId: 'author-2',
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
