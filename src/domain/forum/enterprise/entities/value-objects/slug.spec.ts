import { expect, test } from 'vitest';

import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

test('it UseCase be able to create a new slug from text', () => {
	const slug = Slug.createFromTextNormalize('Example text--˜!@#$%ˆ&*()_+`=^-');

	expect(slug.value).toEqual('example-text');
});
