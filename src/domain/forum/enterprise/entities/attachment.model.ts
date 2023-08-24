import { Optional } from '@domain-forum/enterprise/entities/types/optional';

import { Entity } from '@core/entities/entity';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

export interface IAttachment {
	title: string;
	link: string;
	createdAt: Date;
	updatedAt?: Date;
}

export class Attachment extends Entity<IAttachment> {
	get title() {
		return this.props.title;
	}

	set title(title: string) {
		this.props.title = title;
		this.touch();
	}

	get link() {
		return this.props.link;
	}

	set link(link: string) {
		this.props.link = link;
		this.touch();
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	static create(
		props: Optional<IAttachment, 'createdAt'>,
		id?: UniqueEntityId,
	) {
		return new Attachment(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);
	}

	private touch() {
		this.props.updatedAt = new Date();
	}
}
