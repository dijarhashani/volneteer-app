# Volneteer — Scalable Community Volunteer Matching Platform

This repository implements the exact classes shown in the **UML class diagram**, using a layered architecture:

- **models/**: User, Admin, Volunteer, Organization, Opportunity, Application
- **repository/**: DataRepository (Singleton, Repository Pattern, DIP)
- **services/**: MatchingService (Strategy-ready), NotificationService (Observer-like interface)
- **controllers/**: AdminController, OrganizationController, VolunteerController
- **main.js**: Minimal orchestration demo that follows the sequence in the UML

## Run (Node 18+)
```bash
node --version
node src/main.js
```

## Design Principles & Patterns
- **SOLID**: DIP via DataRepository abstraction; SRP across layers.
- **Repository Pattern**: isolates persistence (in-memory for demo).
- **Singleton**: one repository instance to control memory.
- **Strategy-ready MatchingService**: pluggable ranking strategies.
- **Observer-ready NotificationService**: decoupled notifications.

## Memory Safety
- Single repository instance (Singleton) to avoid duplication.
- Cloning on write/read in repository to prevent accidental shared references.
- No global arrays; all data stored in typed buckets.

## Docs
- `docs/docs.pdf`
- `docs/risks_and_patterns.md`
