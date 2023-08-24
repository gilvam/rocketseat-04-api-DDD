import { beforeEach, describe, expect, it } from 'vitest';

import { CommentOnQuestionUseCase } from '@domain-forum/application/use-cases/comment-on-question';

import { makeQuestion } from '@tests/factories/make-question';
import { InMemoryQuestionAttachmentsRepository } from '@tests/repositories/in-memory-question-attachments-repository';
import { InMemoryQuestionCommentsRepository } from '@tests/repositories/in-memory-question-comments-repository';
import { InMemoryQuestionsRepository } from '@tests/repositories/in-memory-questions-repository';

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: CommentOnQuestionUseCase;

describe('Comment on question', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentsRepository,
		);
		inMemoryQuestionCommentsRepository =
			new InMemoryQuestionCommentsRepository();
		sut = new CommentOnQuestionUseCase(
			inMemoryQuestionsRepository,
			inMemoryQuestionCommentsRepository,
		);
	});

	it('should be able to comment on question', async () => {
		const question = makeQuestion();

		await inMemoryQuestionsRepository.create(question);
		await sut.execute({
			questionId: question.id.toString(),
			authorId: question.authorId.toString(),
			content: 'content test',
		});

		expect(inMemoryQuestionCommentsRepository.items[0].content).equals(
			'content test',
		);
	});
});
