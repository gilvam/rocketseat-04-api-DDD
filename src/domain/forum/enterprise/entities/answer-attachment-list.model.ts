import { AnswerAttachment } from '@domain-forum/enterprise/entities/answer-attachment.model';

import { WatchedList } from '@core/entities/watched-list';

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
	compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
		return a.attachmentId === b.attachmentId;
	}
}
