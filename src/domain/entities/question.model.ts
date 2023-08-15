import { Slug } from '@entities/value-objects/slug';
import { Entity } from '@core/entities/entity';
import { UniqueEntityId } from '@core/entities/unique-entity-id';
import { Optional } from '@entities/types/optional';
import dayjs from 'dayjs';

export interface IQuestion {
	authorId: UniqueEntityId;
	bestAnswerId?: UniqueEntityId;
	title: string;
	content: string;
	slug: Slug;
	createdAt: Date;
	updatedAt?: Date;
}

export class Question extends Entity<IQuestion> {
	get authorId() {
		return this.props.authorId;
	}

	get bestAnswerId(): UniqueEntityId | undefined {
		return this.props.bestAnswerId;
	}

	set bestAnswerId(bestAnswerId: UniqueEntityId) {
		this.props.bestAnswerId = bestAnswerId;
		this.touch();
	}

	get title() {
		return this.props.title;
	}

	set title(title: string) {
		this.props.title = title;
		this.props.slug = new Slug(title);
		this.touch();
	}

	get content() {
		return this.props.content;
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}

	get slug() {
		return this.props.slug;
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get isNew(): boolean {
		return dayjs().diff(this.createdAt, 'days') <= 3;
	}

	get except() {
		return this.props.content.substring(0, 120).trim().concat('...');
	}

	static create(
		props: Optional<IQuestion, 'createdAt' | 'slug'>,
		id?: UniqueEntityId,
	) {
		return new Question(
			{
				...props,
				slug: props.slug ?? new Slug(props.title),
				createdAt: new Date(),
			},
			id,
		);
	}

	private touch() {
		this.props.updatedAt = new Date();
	}
}
