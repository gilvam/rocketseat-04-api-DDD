import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { QuestionAttachmentList } from '@domain-forum/enterprise/entities/question-attachment-list.model';
import { QuestionAttachment } from '@domain-forum/enterprise/entities/question-attachment.model';
import { Question } from '@domain-forum/enterprise/entities/question.model';

import { Either, right } from '@core/either';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

interface ICreateQuestionUseCase {
	authorId: string;
	title: string;
	content: string;
	attachmentIds: string[];
}

type ICreateQuestionUseCaseResponse = Either<
	null,
	{
		question: Question;
	}
>;

export class CreateQuestionUseCase {
	constructor(private questionsRepository: IQuestionsRepository) {}

	async execute({
		authorId,
		title,
		content,
		attachmentIds,
	}: ICreateQuestionUseCase): Promise<ICreateQuestionUseCaseResponse> {
		const question = Question.create({
			authorId: new UniqueEntityId(authorId),
			title,
			content,
		});

		const questionAttachments = attachmentIds.map((attachmentId) =>
			QuestionAttachment.create({
				attachmentId: new UniqueEntityId(attachmentId),
				questionId: question.id,
			}),
		);
		question.attachments = new QuestionAttachmentList(questionAttachments);

		await this.questionsRepository.create(question);

		return right({ question });
	}
}
