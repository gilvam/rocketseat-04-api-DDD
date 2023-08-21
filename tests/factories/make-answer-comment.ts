import { faker } from '@faker-js/faker';

import {
	AnswerComment,
	IAnswerComment,
} from '@domain-forum/enterprise/entities/answer-comment.model';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

export function makeAnswerComment(
	override: Partial<IAnswerComment> = {},
	id?: UniqueEntityId,
) {
	return AnswerComment.create(
		{
			authorId: new UniqueEntityId(),
			answerId: new UniqueEntityId(),
			content: faker.lorem.text(),
			...override,
		},
		id,
	);
}
