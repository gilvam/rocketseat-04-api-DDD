import { beforeEach, describe, expect, it } from 'vitest';

import { DeleteQuestionCommentUseCase } from '@domain-forum/application/use-cases/delete-question-comment';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { makeQuestionComment } from '@tests/factories/make-question-comment';
import { InMemoryQuestionCommentsRepository } from '@tests/repositories/in-memory-question-comments-repository';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase;

describe('Delete question comment', () => {
	beforeEach(() => {
		inMemoryQuestionCommentsRepository =
			new InMemoryQuestionCommentsRepository();
		sut = new DeleteQuestionCommentUseCase(
			inMemoryQuestionCommentsRepository,
		);
	});

	it('should be able to delete a question comment', async () => {
		const questionComment = makeQuestionComment();

		await inMemoryQuestionCommentsRepository.create(questionComment);
		await sut.execute({
			id: questionComment.id.toString(),
			authorId: questionComment.authorId.toString(),
		});

		expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
	});

	it('should not be able to delete a question comment', async () => {
		const questionComment = makeQuestionComment({
			authorId: new UniqueEntityId('author-1'),
		});

		await inMemoryQuestionCommentsRepository.create(questionComment);

		expect(
			async () =>
				await sut.execute({
					id: questionComment.id.toString(),
					authorId: 'author-2',
				}),
		).rejects.toBeInstanceOf(Error);
	});
});
