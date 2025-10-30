// AdminController (UML: approveOpportunity(oppld:int), manageUsers(), viewReports())
export class AdminController {
  constructor(repository, notificationService) {
    this.repository = repository;
    this.notificationService = notificationService;
  }

  approveOpportunity(opportunityId) {
    const opp = this.repository.fetchById(opportunityId, 'Opportunity');
    if (!opp) throw new Error('Opportunity not found');
    opp.approved = true;
    this.repository.update(opp);
    return opp;
  }

  manageUsers() { return 'manageUsers executed'; }
  viewReports() { return 'viewReports executed'; }
}
