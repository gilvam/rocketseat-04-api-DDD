import { IQuestionAttachmentsRepository } from '@domain-forum/application/repositories/question-attachments-repository.interface';
import { QuestionAttachment } from '@domain-forum/enterprise/entities/question-attachment.model';

export class InMemoryQuestionAttachmentsRepository
implements IQuestionAttachmentsRepository
{
	items: QuestionAttachment[] = [];

	async findManyByQuestionId(
		questionId: string,
	): Promise<QuestionAttachment[]> {
		return this.items.filter(
			(item) => item.questionId.toString() === questionId,
		);
	}

	async deleteManyByQuestionId(questionId: string): Promise<void> {
		this.items = this.items.filter(
			(item) => item.questionId.toString() !== questionId,
		);
	}
}
