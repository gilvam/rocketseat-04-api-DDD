import { IAnswerAttachmentsRepository } from '@domain-forum/application/repositories/answer-attachments-repository.interface';
import { AnswerAttachment } from '@domain-forum/enterprise/entities/answer-attachment.model';

export class InMemoryAnswerAttachmentsRepository
implements IAnswerAttachmentsRepository
{
	items: AnswerAttachment[] = [];

	async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
		return this.items.filter((item) => item.answerId.toString() === answerId);
	}

	async deleteManyByAnswerId(answerId: string): Promise<void> {
		this.items = this.items.filter(
			(item) => item.answerId.toString() !== answerId,
		);
	}
}
