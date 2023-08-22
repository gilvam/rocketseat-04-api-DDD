import { expect, test } from 'vitest';

import { Either, left, right } from '@core/either';

function doSomething(shouldSuccess: boolean): Either<string, string> {
	if (shouldSuccess) {
		return right('success');
	}

	return left('error');
}

test('success result', () => {
	const success = doSomething(true);

	if (success.isRight()) {
		console.log(`isRigth value: `, success.value);
	}

	expect(success.isRight()).toBeTruthy();
	expect(success.isLeft()).toBeFalsy();
});

test('error result', () => {
	const error = doSomething(false);

	expect(error.isLeft()).toBeTruthy();
	expect(error.isRight()).toBeFalsy();
});
