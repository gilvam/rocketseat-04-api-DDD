import { QuestionAttachment } from '@domain-forum/enterprise/entities/question-attachment.model';

export interface IQuestionAttachmentsRepository {
	findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>;
	deleteManyByQuestionId(questionId: string): Promise<void>;
}
