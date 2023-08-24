import { IAnswerAttachmentsRepository } from '@domain-forum/application/repositories/answer-attachments-repository.interface';
import { IAnswersRepository } from '@domain-forum/application/repositories/answers-repository.interface';
import { NotAllowedError } from '@domain-forum/application/use-cases/_errors/not-allowed.error';
import { ResourceNotFoundError } from '@domain-forum/application/use-cases/_errors/resource-not-found.error';
import { AnswerAttachmentList } from '@domain-forum/enterprise/entities/answer-attachment-list.model';
import { AnswerAttachment } from '@domain-forum/enterprise/entities/answer-attachment.model';
import { Answer } from '@domain-forum/enterprise/entities/answer.model';

import { Either, left, right } from '@core/either';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

interface IEditAnswerUseCase {
	id: string;
	authorId: string;
	content: string;
	attachmentIds: string[];
}

type IEditAnswerUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		answer: Answer;
	}
>;

export class EditAnswerUseCase {
	constructor(
		private answersRepository: IAnswersRepository,
		private answerAttachmentsRepository: IAnswerAttachmentsRepository,
	) {}

	async execute({
		id,
		authorId,
		content,
		attachmentIds,
	}: IEditAnswerUseCase): Promise<IEditAnswerUseCaseResponse> {
		const answer = await this.answersRepository.findById(id);

		if (!answer) {
			return left(new ResourceNotFoundError());
		}
		if (authorId !== answer.authorId.toString()) {
			return left(new NotAllowedError());
		}

		const currentAnswerAttachments =
			await this.answerAttachmentsRepository.findManyByAnswerId(id);
		const answerAttachmentList = new AnswerAttachmentList(
			currentAnswerAttachments,
		);
		const answerAttachments = attachmentIds.map((attachmentId) =>
			AnswerAttachment.create({
				attachmentId: new UniqueEntityId(attachmentId),
				answerId: answer.id,
			}),
		);
		answerAttachmentList.update(answerAttachments);

		answer.attachments = answerAttachmentList;
		answer.content = content;

		await this.answersRepository.edit(answer);

		return right({ answer });
	}
}
