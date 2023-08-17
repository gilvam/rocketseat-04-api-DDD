import { faker } from '@faker-js/faker';

import {
	IQuestion,
	Question,
} from '@domain-forum/enterprise/entities/question.model';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

export function makeQuestion(
	override: Partial<IQuestion> = {},
	id?: UniqueEntityId,
) {
	return Question.create(
		{
			authorId: new UniqueEntityId('1'),
			title: faker.person.fullName(),
			content: faker.lorem.text(),
			...override,
		},
		id,
	);
}
