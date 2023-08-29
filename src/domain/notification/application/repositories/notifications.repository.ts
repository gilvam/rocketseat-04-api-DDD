import { Notification } from '@domain-notification/enterprise/entities/notification.model';

export interface INotificationsRepository {
	create(notification: Notification): Promise<void>;
	findById(id: string): Promise<Notification | undefined>;
	edit(notification: Notification): Promise<void>;
}
