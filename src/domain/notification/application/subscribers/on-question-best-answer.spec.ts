import { OnQuestionBestAnswerChosen } from '@domain-notification/application/subscribers/on-question-best-answer-chosen';
import {
	ISendNotificationUseCase,
	ISendNotificationUseCaseResponse,
	SendNotificationUseCase,
} from '@domain-notification/application/use-cases/send-notification';
import { beforeEach, describe, expect, it, SpyInstance, vi } from 'vitest';

import { makeAnswer } from '@tests/factories/make-answer';
import { makeQuestion } from '@tests/factories/make-question';
import { InMemoryAnswerAttachmentsRepository } from '@tests/repositories/in-memory-answer-attachments-repository';
import { InMemoryAnswersRepository } from '@tests/repositories/in-memory-answers-repository';
import { InMemoryNotificationsRepository } from '@tests/repositories/in-memory-notification-repository';
import { InMemoryQuestionAttachmentsRepository } from '@tests/repositories/in-memory-question-attachments-repository';
import { InMemoryQuestionsRepository } from '@tests/repositories/in-memory-questions-repository';
import { waitFor } from '@tests/utils/wait-for';

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sendNotificationUseCase: SendNotificationUseCase;
let sendNotificationExecuteSpy: SpyInstance<
	[ISendNotificationUseCase],
	Promise<ISendNotificationUseCaseResponse>
>;

describe('On question best answer chosen', () => {
	beforeEach(() => {
		inMemoryQuestionAttachmentsRepository =
			new InMemoryQuestionAttachmentsRepository();
		inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
			inMemoryQuestionAttachmentsRepository,
		);
		inMemoryAnswerAttachmentsRepository =
			new InMemoryAnswerAttachmentsRepository();
		inMemoryAnswersRepository = new InMemoryAnswersRepository(
			inMemoryAnswerAttachmentsRepository,
		);
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		sendNotificationUseCase = new SendNotificationUseCase(
			inMemoryNotificationsRepository,
		);

		sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute');

		new OnQuestionBestAnswerChosen(
			inMemoryAnswersRepository,
			sendNotificationUseCase,
		);
	});

	it('should send a notification when topic has new best answer chosen', async () => {
		const question = makeQuestion();
		const answer = makeAnswer({ questionId: question.id });

		await inMemoryQuestionsRepository.create(question);
		await inMemoryAnswersRepository.create(answer);

		question.bestAnswerId = answer.id;

		await inMemoryQuestionsRepository.edit(question);

		await waitFor(() => {
			expect(sendNotificationExecuteSpy).toHaveBeenCalled();
		});
	});
});
