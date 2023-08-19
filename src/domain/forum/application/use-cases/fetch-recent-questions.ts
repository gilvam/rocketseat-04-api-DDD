import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { Question } from '@domain-forum/enterprise/entities/question.model';

interface IFetchRecentQuestionsUseCase {
	page: number;
}

interface IFetchRecentQuestionsUseCaseResponse {
	questions: Question[];
}

export class FetchRecentQuestionsUseCase {
	constructor(private questionsRepository: IQuestionsRepository) {}

	async execute({
		page,
	}: IFetchRecentQuestionsUseCase): Promise<IFetchRecentQuestionsUseCaseResponse> {
		const questions = await this.questionsRepository.findManyRecent({ page });

		return { questions };
	}
}
