import { Optional } from '@domain-forum/enterprise/entities/types/optional';

import { Entity } from '@core/entities/entity';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

export interface INotification {
	recipientId: UniqueEntityId;
	title: string;
	content: string;
	readAt?: Date;
	createdAt: Date;
}

export class Notification extends Entity<INotification> {
	get recipientId() {
		return this.props.recipientId;
	}

	get title() {
		return this.props.title;
	}

	get content() {
		return this.props.content;
	}

	get readAt() {
		return this.props.readAt;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	read() {
		this.props.readAt = new Date();
	}

	static create(
		props: Optional<INotification, 'createdAt'>,
		id?: UniqueEntityId,
	) {
		return new Notification(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);
	}
}
