import { beforeEach, describe, expect, it } from 'vitest';

import { ChooseQuestionBestAnswerUserCase } from '@domain-forum/application/use-cases/choose-question-best-answer';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { makeAnswer } from '@tests/factories/make-answer';
import { makeQuestion } from '@tests/factories/make-question';
import { InMemoryAnswersRepository } from '@tests/repositories/in-memory-answers-repository';
import { InMemoryQuestionRepository } from '@tests/repositories/in-memory-question-repository';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseQuestionBestAnswerUserCase;

describe('Choose question best answer', () => {
	beforeEach(() => {
		inMemoryQuestionRepository = new InMemoryQuestionRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository();
		sut = new ChooseQuestionBestAnswerUserCase(
			inMemoryQuestionRepository,
			inMemoryAnswersRepository,
		);
	});

	it('should be able to choose the question best answer', async () => {
		const question = makeQuestion();
		const answer = makeAnswer({ questionId: question.id });

		await inMemoryQuestionRepository.create(question);
		await inMemoryAnswersRepository.create(answer);
		await sut.execute({
			authorId: question.authorId.toString(),
			answerId: answer.id.toString(),
		});

		expect(inMemoryQuestionRepository.items[0].bestAnswerId).equals(
			answer.id,
		);
	});

	it('should be able to choose another user question best answer', async () => {
		const question = makeQuestion({
			authorId: new UniqueEntityId('author-1'),
		});
		const answer = makeAnswer({ questionId: question.id });

		await inMemoryQuestionRepository.create(question);
		await inMemoryAnswersRepository.create(answer);

		expect(
			async () =>
				await sut.execute({
					authorId: 'author-2',
					answerId: answer.id.toString(),
				}),
		).rejects.toBeInstanceOf(Error);
	});
});
