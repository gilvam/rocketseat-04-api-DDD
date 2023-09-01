import { UniqueEntityId } from './unique-entity-id';

export abstract class Entity<Props> {
	private readonly _id: UniqueEntityId;
	protected props: Props;

	protected constructor(props: Props, id?: UniqueEntityId) {
		this.props = props;
		this._id = id ?? new UniqueEntityId();
	}

	get id() {
		return this._id;
	}

	equals(entity: Entity<any>) {
		// return entity === this || entity.id === this._id;

		if (entity === this) {
			return true;
		}
		if (entity.id === this._id) {
			return true;
		}

		return false;
	}
}
