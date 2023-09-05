import dayjs from 'dayjs';

import { QuestionAttachmentList } from '@domain-forum/enterprise/entities/question-attachment-list.model';
import { Optional } from '@domain-forum/enterprise/entities/types/optional';
import { Slug } from '@domain-forum/enterprise/entities/value-objects/slug';
import { QuestionBestAnswerChosenEvent } from '@domain-forum/enterprise/events/question-best-answer-chosen.event';

import { AggregateRoot } from '@core/entities/aggregate-root';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

export interface IQuestion {
	authorId: UniqueEntityId;
	bestAnswerId?: UniqueEntityId;
	title: string;
	content: string;
	slug: Slug;
	attachments: QuestionAttachmentList;
	createdAt: Date;
	updatedAt?: Date;
}

export class Question extends AggregateRoot<IQuestion> {
	get authorId() {
		return this.props.authorId;
	}

	get bestAnswerId(): UniqueEntityId | undefined {
		return this.props.bestAnswerId;
	}

	set bestAnswerId(bestAnswerId: UniqueEntityId) {
		if (bestAnswerId && bestAnswerId !== this.props.bestAnswerId) {
			this.addDomainEvent(
				new QuestionBestAnswerChosenEvent(this, bestAnswerId),
			);
		}
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

	get attachments(): QuestionAttachmentList {
		return this.props.attachments;
	}

	set attachments(attachments: QuestionAttachmentList) {
		this.props.attachments = attachments;
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
		props: Optional<IQuestion, 'createdAt' | 'slug' | 'attachments'>,
		id?: UniqueEntityId,
	) {
		return new Question(
			{
				...props,
				slug: props.slug ?? new Slug(props.title),
				attachments: props.attachments ?? new QuestionAttachmentList(),
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);
	}

	private touch() {
		this.props.updatedAt = new Date();
	}
}
