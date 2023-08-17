import { faker } from '@faker-js/faker';

import {
	Answer,
	IAnswer,
} from '@domain-forum/enterprise/entities/answer.model';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

export function makeAnswer(
	override: Partial<IAnswer> = {},
	id?: UniqueEntityId,
) {
	return Answer.create(
		{
			authorId: new UniqueEntityId(),
			questionId: new UniqueEntityId(),
			content: faker.lorem.text(),
			...override,
		},
		id,
	);
}
