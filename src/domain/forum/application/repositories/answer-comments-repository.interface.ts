import { AnswerComment } from '@domain-forum/enterprise/entities/answer-comment.model';

export interface IAnswerCommentsRepository {
	create(answerComment: AnswerComment): Promise<void>;
}
