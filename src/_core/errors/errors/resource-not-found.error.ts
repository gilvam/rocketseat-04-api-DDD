import { IUseCaseError } from '@core/errors/use-case-error.interface';

export class ResourceNotFoundError extends Error implements IUseCaseError {
	constructor() {
		super('Resource not found');
	}
}
