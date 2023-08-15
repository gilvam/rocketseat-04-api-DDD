export class Slug {
	value: string;

	constructor(value: string) {
		this.value = this.create(value);
	}

	private create(text: string): string {
		const textSlug = text
			.normalize('NFKD')
			.toLowerCase()
			.trim()
			.replace(/\s+/g, '-')
			.replace(/[^\w-]+/g, '')
			.replace(/_/g, '-')
			.replace(/--+/g, '-')
			.replace(/-$/g, '');

		return textSlug;
	}

	static createFromTextNormalize(text: string): Slug {
		return new Slug(text);
	}
}
