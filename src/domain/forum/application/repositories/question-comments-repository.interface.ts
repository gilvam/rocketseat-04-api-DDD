import { QuestionComment } from '@domain-forum/enterprise/entities/question-comment.model';

export interface IQuestionCommentsRepository {
	create(questionComment: QuestionComment): Promise<void>;
}
