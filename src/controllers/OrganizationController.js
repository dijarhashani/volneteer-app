// OrganizationController (UML: createOpportunity(), viewApplications())
export class OrganizationController {
  constructor(repository) { this.repository = repository; }

  createOpportunity(opportunity) { return this.repository.save(opportunity); }
  viewApplications(opportunityId, applications = []) {
    return applications.filter(a => a.opportunityId === opportunityId);
  }
}
