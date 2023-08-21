import { IAnswerCommentsRepository } from '@domain-forum/application/repositories/answer-comments-repository.interface';
import { AnswerComment } from '@domain-forum/enterprise/entities/answer-comment.model';

interface IFetchAnswerCommentsUseCase {
	answerId: string;
	page: number;
}

interface IFetchAnswerCommentsUseCaseResponse {
	answerComments: AnswerComment[];
}

export class FetchAnswerCommentsUseCase {
	constructor(private answerCommentsRepository: IAnswerCommentsRepository) {}

	async execute({
		answerId,
		page,
	}: IFetchAnswerCommentsUseCase): Promise<IFetchAnswerCommentsUseCaseResponse> {
		const answerComments =
			await this.answerCommentsRepository.findManyByAnswerId(answerId, {
				page,
			});

		return { answerComments };
	}
}
