import { beforeEach, describe, expect, it } from 'vitest';

import { NotAllowedError } from '@domain-forum/application/use-cases/_errors/not-allowed.error';
import { ChooseQuestionBestAnswerUserCase } from '@domain-forum/application/use-cases/choose-question-best-answer';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { makeAnswer } from '@tests/factories/make-answer';
import { makeQuestion } from '@tests/factories/make-question';
import { InMemoryAnswerAttachmentsRepository } from '@tests/repositories/in-memory-answer-attachments-repository';
import { InMemoryAnswersRepository } from '@tests/repositories/in-memory-answers-repository';
import { InMemoryQuestionAttachmentsRepository } from '@tests/repositories/in-memory-question-attachments-repository';
import { InMemoryQuestionsRepository } from '@tests/repositories/in-memory-questions-repository';

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUserCase;

describe('Choose question best answer', () => {
	beforeEach(() => {
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentsRepository,
		);
		inMemoryAnswersRepository = new InMemoryAnswersRepository(
			inMemoryAnswerAttachmentsRepository,
		);
		sut = new ChooseQuestionBestAnswerUserCase(
			inMemoryQuestionsRepository,
			inMemoryAnswersRepository,
		);
	});

	it('should be able to choose the question best answer', async () => {
		const question = makeQuestion();
		const answer = makeAnswer({ questionId: question.id });

		await inMemoryQuestionsRepository.create(question);
		await inMemoryAnswersRepository.create(answer);
		await sut.execute({
			authorId: question.authorId.toString(),
			answerId: answer.id.toString(),
		});

		expect(inMemoryQuestionsRepository.items[0].bestAnswerId).equals(
			answer.id,
		);
	});

	it('should be able to choose another user question best answer', async () => {
		const question = makeQuestion({
			authorId: new UniqueEntityId('author-1'),
		});
		const answer = makeAnswer({ questionId: question.id });

		await inMemoryQuestionsRepository.create(question);
		await inMemoryAnswersRepository.create(answer);
		const result = await sut.execute({
			authorId: 'author-2',
			answerId: answer.id.toString(),
		});

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
