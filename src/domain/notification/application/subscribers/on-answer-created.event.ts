import { OnAnswerCreated } from '@domain-notification/application/subscribers/on-answer-created';
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

describe('On Answer Created', () => {
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

		new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase);
	});

	it('should send a notification when an answer is created', async () => {
		const question = makeQuestion();
		const answer = makeAnswer({ questionId: question.id });

		await inMemoryQuestionsRepository.create(question);
		await inMemoryAnswersRepository.create(answer);

		await waitFor(() => {
			expect(sendNotificationExecuteSpy).toHaveBeenCalled();
		});
	});
});
