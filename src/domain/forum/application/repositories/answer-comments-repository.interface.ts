import { AnswerComment } from '@domain-forum/enterprise/entities/answer-comment.model';

export interface IAnswerCommentsRepository {
	create(answerComment: AnswerComment): Promise<void>;
	findById(id: string): Promise<AnswerComment | undefined>;
	delete(questionComment: AnswerComment): Promise<void>;
}
