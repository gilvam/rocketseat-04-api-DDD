import { beforeEach, describe, expect, it } from 'vitest';

import { CommentOnAnswerUseCase } from '@domain-forum/application/use-cases/comment-on-answer';

import { makeAnswer } from '@tests/factories/make-answer';
import { InMemoryAnswerAttachmentsRepository } from '@tests/repositories/in-memory-answer-attachments-repository';
import { InMemoryAnswerCommentsRepository } from '@tests/repositories/in-memory-answer-comments-repository';
import { InMemoryAnswersRepository } from '@tests/repositories/in-memory-answers-repository';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe('Comment on answer', () => {
	beforeEach(() => {
		inMemoryAnswersRepository = new InMemoryAnswersRepository(
			inMemoryAnswerAttachmentsRepository,
		);
		inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
		sut = new CommentOnAnswerUseCase(
			inMemoryAnswersRepository,
			inMemoryAnswerCommentsRepository,
		);
	});

	it('should be able to comment on answer', async () => {
		const answer = makeAnswer();

		await inMemoryAnswersRepository.create(answer);
		const result = await sut.execute({
			answerId: answer.id.toString(),
			authorId: answer.authorId.toString(),
			content: 'content test',
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryAnswerCommentsRepository.items[0]).equals(
			result.value?.answerComment,
		);
	});
});
