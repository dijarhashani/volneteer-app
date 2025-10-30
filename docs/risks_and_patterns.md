# Anticipated Design Risks & Applied Patterns

## Risks
1) **Unbounded memory growth** if many entities are kept in process memory.
   - **Mitigation:** Singleton `DataRepository` centralizes storage; move to external DB later without changing higher layers (DIP).

2) **Tight coupling between layers** could hinder testing.
   - **Mitigation:** Controllers receive services and repository via **Dependency Injection** in `main.js`.

3) **Blocking operations** during match computation.
   - **Mitigation:** Keep algorithm linear in the number of opportunities; future background worker can replace call without API changes (Strategy pattern).

## Patterns
- **Repository Pattern** — `DataRepository.js`
- **Singleton** — `DataRepository.js`
- **Strategy-ready** — `MatchingService.js`
- **Observer-ready** — `NotificationService.js`
- **DIP / DI** — construction in `src/main.js`
