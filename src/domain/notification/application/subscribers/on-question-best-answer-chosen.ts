import { SendNotificationUseCase } from '@domain-notification/application/use-cases/send-notification';

import { IAnswersRepository } from '@domain-forum/application/repositories/answers-repository.interface';
import { QuestionBestAnswerChosenEvent } from '@domain-forum/enterprise/events/question-best-answer-chosen.event';

import { DomainEvents } from '@core/events/domain-events';
import { IEventHandler } from '@core/events/event-handler.interface';

export class OnQuestionBestAnswerChosen implements IEventHandler {
	constructor(
		private answersRepository: IAnswersRepository,
		private sendNotificationUseCase: SendNotificationUseCase,
	) {
		this.setupSubscriptions();
	}

	setupSubscriptions(): void {
		DomainEvents.register(
			this.sendQuestionBestAnswerNotification.bind(this),
			QuestionBestAnswerChosenEvent.name,
		);
	}

	private async sendQuestionBestAnswerNotification({
		question,
		bestAnswerId,
	}: QuestionBestAnswerChosenEvent) {
		const answer = await this.answersRepository.findById(
			bestAnswerId.toString(),
		);

		if (answer) {
			await this.sendNotificationUseCase.execute({
				recipientId: answer.authorId.toString(),
				title: `Your answer was chosen`,
				content: `the answer you sent in "${question.title
					.substring(0, 40)
					.concat('...')}}" was chosen by the author`,
			});
		}
	}
}
