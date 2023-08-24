import {
	AnswerAttachment,
	IAnswerAttachment,
} from '@domain-forum/enterprise/entities/answer-attachment.model';

import { UniqueEntityId } from '@core/entities/unique-entity-id';

export function makeAnswerAttachment(
	override: Partial<IAnswerAttachment> = {},
	id?: UniqueEntityId,
) {
	return AnswerAttachment.create(
		{
			answerId: new UniqueEntityId(),
			attachmentId: new UniqueEntityId(),
			...override,
		},
		id,
	);
}
