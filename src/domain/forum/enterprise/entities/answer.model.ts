import { AnswerAttachmentList } from '@domain-forum/enterprise/entities/answer-attachment-list.model';

import { Entity } from '@core/entities/entity';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { Optional } from '@/domain/forum/enterprise/entities/types/optional';

export interface IAnswer {
	authorId: UniqueEntityId;
	questionId: UniqueEntityId;
	content: string;
	attachments: AnswerAttachmentList;
	createdAt: Date;
	updatedAt?: Date;
}

export class Answer extends Entity<IAnswer> {
	get authorId() {
		return this.props.authorId;
	}

	get questionId() {
		return this.props.questionId;
	}

	get content() {
		return this.props.content;
	}

	set content(content: string) {
		this.props.content = content;
		this.touch();
	}

	get attachments(): AnswerAttachmentList {
		return this.props.attachments;
	}

	set attachments(attachments: AnswerAttachmentList) {
		this.props.attachments = attachments;
		this.touch();
	}

	get createdAt() {
		return this.props.createdAt;
	}

	get updatedAt() {
		return this.props.updatedAt;
	}

	get except() {
		return this.props.content.substring(0, 120).trim().concat('...');
	}

	static create(
		props: Optional<IAnswer, 'createdAt' | 'attachments'>,
		id?: UniqueEntityId,
	) {
		return new Answer(
			{
				...props,
				attachments: props.attachments ?? new AnswerAttachmentList(),
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);
	}

	private touch() {
		this.props.updatedAt = new Date();
	}
}
