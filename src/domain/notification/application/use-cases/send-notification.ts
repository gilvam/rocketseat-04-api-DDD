import { INotificationsRepository } from '@domain-notification/application/repositories/notifications.repository';
import { Notification } from '@domain-notification/enterprise/entities/notification.model';

import { Either, right } from '@core/either';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

interface ISendNotificationUseCase {
	recipientId: string;
	title: string;
	content: string;
}

type ISendNotificationUseCaseResponse = Either<
	null,
	{
		notification: Notification;
	}
>;

export class SendNotificationUseCase {
	constructor(private notificationsRepository: INotificationsRepository) {}

	async execute({
		recipientId,
		title,
		content,
	}: ISendNotificationUseCase): Promise<ISendNotificationUseCaseResponse> {
		const notification = Notification.create({
			recipientId: new UniqueEntityId(recipientId),
			title,
			content,
		});

		await this.notificationsRepository.create(notification);

		return right({ notification });
	}
}
