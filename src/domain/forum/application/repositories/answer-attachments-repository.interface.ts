import { AnswerAttachment } from '@domain-forum/enterprise/entities/answer-attachment.model';

export interface IAnswerAttachmentsRepository {
	findManyByAnswerId(questionId: string): Promise<AnswerAttachment[]>;
	deleteManyByAnswerId(questionId: string): Promise<void>;
}
