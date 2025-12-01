// OrganizationController (UML: createOpportunity(), viewApplications())
export class OrganizationController {
  constructor(repository) {
    this.repository = repository;
  }

  createOpportunity(opportunity) {
    return this.repository.save(opportunity);
  }

  viewApplications(opportunityId) {
    const allApplications = this.repository._all('Application');
    return allApplications.filter(a => a.opportunityId === opportunityId);
  }
}
