// DataRepository
// Demonstrates Dependency Inversion & Singleton.
// Stores entities in-memory, grouped by their type name.

export class DataRepository {
  static instance;

  constructor() {
    if (DataRepository.instance) {
      return DataRepository.instance;
    }
    this._store = new Map(); 
    DataRepository.instance = this;
  }

  _bucketForType(typeName) {
    if (!this._store.has(typeName)) {
      this._store.set(typeName, new Map());
    }
    return this._store.get(typeName);
  }

  _detectType(entity, explicitType) {
    if (explicitType) return explicitType;
    return entity?.constructor?.name ?? 'Unknown';
  }

  _detectId(entity, typeName) {
    if (!entity) return undefined;
    if ('userId' in entity) return entity.userId;
    if ('applicationId' in entity) return entity.applicationId;
    if ('opportunityId' in entity) return entity.opportunityId;
    if ('orgId' in entity) return entity.orgId;
    if ('adminId' in entity) return entity.adminId;
    // fallback: try generic id
    if ('id' in entity) return entity.id;
    throw new Error(`Cannot detect id field for type ${typeName}`);
  }

  save(entity, explicitType) {
    const typeName = this._detectType(entity, explicitType);
    const bucket = this._bucketForType(typeName);
    const id = this._detectId(entity, typeName);
    bucket.set(id, entity);
    return entity;
  }

  update(entity, explicitType) {
    const typeName = this._detectType(entity, explicitType);
    const bucket = this._bucketForType(typeName);
    const id = this._detectId(entity, typeName);
    if (!bucket.has(id)) {
      throw new Error(`Cannot update: ${typeName} with id ${id} not found`);
    }
    bucket.set(id, entity);
    return entity;
  }

  fetchById(id, typeName) {
    const bucket = this._bucketForType(typeName);
    return bucket.get(id) || null;
  }

  _all(typeName) {
    const bucket = this._bucketForType(typeName);
    return Array.from(bucket.values());
  }
}
