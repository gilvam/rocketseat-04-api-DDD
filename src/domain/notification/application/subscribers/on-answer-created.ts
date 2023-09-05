import { SendNotificationUseCase } from '@domain-notification/application/use-cases/send-notification';

import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { AnswerCreatedEvent } from '@domain-forum/enterprise/events/answer-created.event';

import { DomainEvents } from '@core/events/domain-events';
import { IEventHandler } from '@core/events/event-handler.interface';

export class OnAnswerCreated implements IEventHandler {
	constructor(
		private questionsRepository: IQuestionsRepository,
		private sendNotificationUseCase: SendNotificationUseCase,
	) {
		this.setupSubscriptions();
	}

	setupSubscriptions(): void {
		DomainEvents.register(
			this.sendNewAnswerNotification.bind(this),
			AnswerCreatedEvent.name,
		);
	}

	private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
		const question = await this.questionsRepository.findById(
			answer.questionId.toString(),
		);

		if (question) {
			await this.sendNotificationUseCase.execute({
				recipientId: question.authorId.toString(),
				title: `new answer in "${question.title
					.substring(0, 40)
					.concat('...')}"`,
				content: answer.except,
			});
		}
	}
}
