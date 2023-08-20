import {
	Comment,
	IComment,
} from '@domain-forum/enterprise/entities/comment.model';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

import { Optional } from '@/domain/forum/enterprise/entities/types/optional';

export interface IQuestionComment extends IComment {
	questionId: UniqueEntityId;
}

export class QuestionComment extends Comment<IQuestionComment> {
	get questionId() {
		return this.props.questionId;
	}

	static create(
		props: Optional<IQuestionComment, 'createdAt'>,
		id?: UniqueEntityId,
	) {
		return new QuestionComment(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		);
	}
}
