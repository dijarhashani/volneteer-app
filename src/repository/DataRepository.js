// Demonstrates Dependency Inversion (D in SOLID) and Singleton to control memory usage.
export class DataRepository {
  static instance;

  constructor() {
    if (DataRepository.instance) return DataRepository.instance;
    this._store = new Map(); 
    DataRepository.instance = this;
  }

  _bucketFor(entity) {
    const type = entity?.constructor?.name ?? 'Unknown';
    if (!this._store.has(type)) this._store.set(type, new Map());
    return this._store.get(type);
  }

  _bucketByName(typeName) {
    if (!this._store.has(typeName)) this._store.set(typeName, new Map());
    return this._store.get(typeName);
  }

  save(entity) {
    if (entity == null) throw new Error('Cannot save null/undefined entity');
    const bucket = this._bucketFor(entity);
    const idField = Object.keys(entity).find(k => /id$/i.test(k));
    if (!idField) throw new Error('Entity must contain an id-like field (e.g., userId, orgId, opportunityId)');
    const id = entity[idField];
    bucket.set(id, JSON.parse(JSON.stringify(entity)));
    return entity;
  }

  update(entity) {
    const bucket = this._bucketFor(entity);
    const idField = Object.keys(entity).find(k => /id$/i.test(k));
    const id = entity[idField];
    if (!bucket.has(id)) throw new Error('Entity not found');
    bucket.set(id, JSON.parse(JSON.stringify(entity)));
    return entity;
  }

  delete(entityId, typeName) {
    if (!typeName) throw new Error('typeName required to delete to avoid ambiguity');
    const bucket = this._bucketByName(typeName);
    return bucket.delete(entityId);
  }

  fetchById(entityId, typeName) {
    if (!typeName) throw new Error('typeName required to fetch to avoid ambiguity');
    const bucket = this._bucketByName(typeName);
    const val = bucket.get(entityId);
    return val ? JSON.parse(JSON.stringify(val)) : null;
  }

  _all(typeName) {
    const bucket = this._bucketByName(typeName);
    return Array.from(bucket.values());
  }
}
