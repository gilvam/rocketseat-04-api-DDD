import {
	IQuestionAttachment,
	QuestionAttachment,
} from '@domain-forum/enterprise/entities/question-attachment.model';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

export function makeQuestionAttachment(
	override: Partial<IQuestionAttachment> = {},
	id?: UniqueEntityId,
) {
	return QuestionAttachment.create(
		{
			questionId: new UniqueEntityId(),
			attachmentId: new UniqueEntityId(),
			...override,
		},
		id,
	);
}
