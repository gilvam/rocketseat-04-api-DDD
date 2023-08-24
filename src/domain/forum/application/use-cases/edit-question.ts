import { IQuestionAttachmentsRepository } from '@domain-forum/application/repositories/question-attachments-repository.interface';
import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { NotAllowedError } from '@domain-forum/application/use-cases/_errors/not-allowed.error';
import { ResourceNotFoundError } from '@domain-forum/application/use-cases/_errors/resource-not-found.error';
import { QuestionAttachmentList } from '@domain-forum/enterprise/entities/question-attachment-list.model';
import { QuestionAttachment } from '@domain-forum/enterprise/entities/question-attachment.model';
import { Question } from '@domain-forum/enterprise/entities/question.model';

import { Either, left, right } from '@core/either';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

interface IEditQuestionUseCase {
	id: string;
	authorId: string;
	title: string;
	content: string;
	attachmentIds: string[];
}

type IEditQuestionUseCaseResponse = Either<
	ResourceNotFoundError | NotAllowedError,
	{
		question: Question;
	}
>;

export class EditQuestionUseCase {
	constructor(
		private questionsRepository: IQuestionsRepository,
		private questionAttachmentsRepository: IQuestionAttachmentsRepository,
	) {}

	async execute({
		id,
		authorId,
		title,
		content,
		attachmentIds,
	}: IEditQuestionUseCase): Promise<IEditQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(id);

		if (!question) {
			return left(new ResourceNotFoundError());
		}
		if (authorId !== question.authorId.toString()) {
			return left(new NotAllowedError());
		}

		const currentQuestionAttachments =
			await this.questionAttachmentsRepository.findManyByQuestionId(id);
		const questionAttachmentList = new QuestionAttachmentList(
			currentQuestionAttachments,
		);
		const questionAttachments = attachmentIds.map((attachmentId) =>
			QuestionAttachment.create({
				attachmentId: new UniqueEntityId(attachmentId),
				questionId: question.id,
			}),
		);
		questionAttachmentList.update(questionAttachments);

		question.attachments = questionAttachmentList;
		question.title = title;
		question.content = content;

		await this.questionsRepository.edit(question);

		return right({ question });
	}
}
