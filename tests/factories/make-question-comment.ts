import { faker } from '@faker-js/faker';

import {
	IQuestionComment,
	QuestionComment,
} from '@domain-forum/enterprise/entities/question-comment.model';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

export function makeQuestionComment(
	override: Partial<IQuestionComment> = {},
	id?: UniqueEntityId,
) {
	return QuestionComment.create(
		{
			authorId: new UniqueEntityId(),
			questionId: new UniqueEntityId(),
			content: faker.lorem.text(),
			...override,
		},
		id,
	);
}
