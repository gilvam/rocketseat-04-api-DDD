import { UniqueEntityId } from './unique-entity-id';

export class Entity<T> {
	private readonly _id: UniqueEntityId;
	protected props: T;

	protected constructor(props: T, id?: UniqueEntityId) {
		this.props = props;
		this._id = id ?? new UniqueEntityId();
	}

	get id() {
		return this._id;
	}
}