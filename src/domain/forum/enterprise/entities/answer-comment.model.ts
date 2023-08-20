import {
	Comment,
	IComment,
} from '@domain-forum/enterprise/entities/comment.model';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { Optional } from '@/domain/forum/enterprise/entities/types/optional';

export interface IAnswerComment extends IComment {
	answerId: UniqueEntityId;
}

export class AnswerComment extends Comment<IAnswerComment> {
	get answerId() {
		return this.props.answerId;
	}

	static create(
		props: Optional<IAnswerComment, 'createdAt'>,
		id?: UniqueEntityId,
	) {
		return new AnswerComment(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);
	}
}
