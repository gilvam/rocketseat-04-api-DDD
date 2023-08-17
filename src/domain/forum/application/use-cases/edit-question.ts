import { IQuestionsRepository } from '@domain-forum/application/repositories/questions-repository.interface';
import { Question } from '@domain-forum/enterprise/entities/question.model';

interface IEditQuestionUseCase {
	id: string;
	authorId: string;
	title: string;
	content: string;
}

interface IEditQuestionUseCaseResponse {
	question: Question;
}

export class EditQuestionUseCase {
	constructor(private questionsRepository: IQuestionsRepository) {}

	async execute({
		id,
		authorId,
		title,
		content,
	}: IEditQuestionUseCase): Promise<IEditQuestionUseCaseResponse> {
		const question = await this.questionsRepository.findById(id);

		if (!question) {
			throw new Error('Question not found.');
		}
		if (authorId !== question.authorId.toString()) {
			throw new Error('Not allowed.');
		}

		question.title = title;
		question.content = content;

		await this.questionsRepository.edit(question);

		return { question };
	}
}
