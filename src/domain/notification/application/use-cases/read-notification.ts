import { INotificationsRepository } from '@domain-notification/application/repositories/notifications.repository';
import { Notification } from '@domain-notification/enterprise/entities/notification.model';

import { Either, left, right } from '@core/either';
import { NotAllowedError } from '@core/errors/errors/not-allowed.error';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';

interface IReadNotificationUseCase {
	id: string;
	recipientId: string;
}

type IReadNotificationUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		notification: Notification;
	}
>;

export class ReadNotificationUseCase {
	constructor(private notificationsRepository: INotificationsRepository) {}

	async execute({
		id,
		recipientId,
	}: IReadNotificationUseCase): Promise<IReadNotificationUseCaseResponse> {
		const notification = await this.notificationsRepository.findById(id);

		if (!notification) {
			return left(new ResourceNotFoundError());
		}
		if (recipientId !== notification.recipientId.toString()) {
			return left(new NotAllowedError());
		}

		notification.read();

		await this.notificationsRepository.edit(notification);

		return right({ notification });
	}
}
