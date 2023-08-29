import { faker } from '@faker-js/faker';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import {
	INotification,
	Notification,
} from '@/domain/notification/enterprise/entities/notification.model';

export function makeNotification(
	override: Partial<INotification> = {},
	id?: UniqueEntityId,
) {
	return Notification.create(
		{
			recipientId: new UniqueEntityId(),
			title: faker.person.fullName(),
			content: faker.lorem.text(),
			...override,
		},
		id,
	);
}
