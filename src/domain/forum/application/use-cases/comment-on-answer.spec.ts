import { beforeEach, describe, expect, it } from 'vitest';

import { CommentOnAnswerUseCase } from '@domain-forum/application/use-cases/comment-on-answer';

import { makeAnswer } from '@tests/factories/make-answer';
import { InMemoryAnswerCommentsRepository } from '@tests/repositories/in-memory-answer-comments-repository';
import { InMemoryAnswersRepository } from '@tests/repositories/in-memory-answers-repository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe('Comment on answer', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new CommentOnAnswerUseCase(
			inMemoryAnswersRepository,
			inMemoryAnswerCommentsRepository,
		);
	});

	it('should be able to comment on answer', async () => {
		const answer = makeAnswer();

		await inMemoryAnswersRepository.create(answer);
		await sut.execute({
			answerId: answer.id.toString(),
			authorId: answer.authorId.toString(),
			content: 'content test',
		});

		expect(inMemoryAnswerCommentsRepository.items[0].content).equals(
			'content test',
		);
	});
});
