import { INotificationsRepository } from '@/domain/notification/application/repositories/notifications.repository';
import { Notification } from '@/domain/notification/enterprise/entities/notification.model';

export class InMemoryNotificationsRepository
implements INotificationsRepository
{
	items: Notification[] = [];

	async create(notification: Notification) {
		this.items.push(notification);
	}

	async edit(notification: Notification): Promise<void> {
		const index = this.items.findIndex((it) => it.id !== notification.id);
		this.items[index] = notification;
	}

	async findById(id: string): Promise<Notification | undefined> {
		return this.items.find((it) => it.id.toString() === id);
	}
}
