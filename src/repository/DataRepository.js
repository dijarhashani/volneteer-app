// Demonstrates Dependency Inversion Principle (D in SOLID)
// Also follows Singleton Pattern to prevent redundant instances and memory leaks
export class DataRepository {
  static instance;
  constructor() {
    if (DataRepository.instance) return DataRepository.instance;
    this.entities = new Map(); // Using Map for efficient lookup and memory control
    DataRepository.instance = this;
  }

  save(entity) {
    if (!entity.id) throw new Error("Entity must have an ID");
    this.entities.set(entity.id, entity);
  }

  update(entity) {
    if (!entity.id || !this.entities.has(entity.id)) throw new Error("Entity not found");
    this.entities.set(entity.id, entity);
  }

  delete(entityId) {
    if (!this.entities.has(entityId)) throw new Error("Entity not found");
    this.entities.delete(entityId);
  }

  fetchById(entityId) {
    return this.entities.get(entityId) || null;
  }

  // Optional: safe cleanup to release memory when needed
  clear() {
    this.entities.clear();
  }
}
