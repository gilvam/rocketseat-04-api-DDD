import { ReadNotificationUseCase } from '@domain-notification/application/use-cases/read-notification';
import { beforeEach, describe, expect, it } from 'vitest';

import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { NotAllowedError } from '@core/errors/errors/not-allowed.error';

import { makeNotification } from '@tests/factories/make-notification';
import { InMemoryNotificationsRepository } from '@tests/repositories/in-memory-notification-repository';

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe('Read notification', () => {
	beforeEach(() => {
		inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
		sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
	});

	it('UseCase be able to read a notification', async () => {
		const notification = makeNotification();

		await inMemoryNotificationsRepository.create(notification);

		const result = await sut.execute({
			id: notification.id.toString(),
			recipientId: notification.recipientId.toString(),
		});

		expect(result.isRight()).toBeTruthy();
		expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
			expect.any(Date),
		);
	});

	it('UseCase not be able to read a notification from another user', async () => {
		const id = 'notification-1';
		const recipientId = 'notification-2';
		const newNotification = makeNotification({}, new UniqueEntityId(id));

		await inMemoryNotificationsRepository.create(newNotification);
		const result = await sut.execute({ id, recipientId });

		expect(result.isLeft()).toBeTruthy();
		expect(result.value).toBeInstanceOf(NotAllowedError);
	});
});
