import { IAnswersRepository } from '@domain-forum/application/repositories/answers-repository.interface';
import { AnswerAttachmentList } from '@domain-forum/enterprise/entities/answer-attachment-list.model';
import { AnswerAttachment } from '@domain-forum/enterprise/entities/answer-attachment.model';
import { Answer } from '@domain-forum/enterprise/entities/answer.model';

import { Either, right } from '@core/either';
import { UniqueEntityId } from '@core/entities/unique-entity-id';

interface IAnswerQuestionUseCase {
	instructorId: string;
	questionId: string;
	attachmentIds: string[];
	content: string;
}

type IAnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>;

export class AnswerQuestionUseCase {
	constructor(private answersRepository: IAnswersRepository) {}

	async execute({
		instructorId,
		questionId,
		content,
		attachmentIds,
	}: IAnswerQuestionUseCase): Promise<IAnswerQuestionUseCaseResponse> {
		const answer = Answer.create({
			content,
			authorId: new UniqueEntityId(instructorId),
			questionId: new UniqueEntityId(questionId),
		});

		const answerAttachments = attachmentIds.map((attachmentId) =>
			AnswerAttachment.create({
				attachmentId: new UniqueEntityId(attachmentId),
				answerId: answer.id,
			}),
		);
		answer.attachments = new AnswerAttachmentList(answerAttachments);

		await this.answersRepository.create(answer);

		return right({ answer });
	}
}
