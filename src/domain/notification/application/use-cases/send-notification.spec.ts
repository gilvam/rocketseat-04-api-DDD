import { SendNotificationUseCase } from '@domain-notification/application/use-cases/send-notification';
import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryNotificationsRepository } from '@tests/repositories/in-memory-notification-repository';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

describe('Send notification', () => {
	beforeEach(() => {
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		sut = new SendNotificationUseCase(inMemoryNotificationsRepository);
	});

	it('UseCase be able to send a notification', async () => {
		const result = await sut.execute({
			recipientId: '1',
			title: 'New notification',
			content: 'Content about the notification',
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryNotificationsRepository.items[0]).toEqual(
			result.value?.notification,
		);
	});
});
