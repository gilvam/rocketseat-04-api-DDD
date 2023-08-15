import { expect, test } from 'vitest';
import { Slug } from '@entities/value-objects/slug';

test('it should be able to create a new slug from text', () => {
	const slug = Slug.createFromTextNormalize('Example text--˜!@#$%ˆ&*()_+`=^-');

	expect(slug.value).toEqual('example-text');
});
