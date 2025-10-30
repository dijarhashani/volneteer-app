// VolunteerController (UML: interacts with Volunteer methods)
export class VolunteerController {
  constructor(repository, matchingService, notificationService) {
    this.repository = repository;
    this.matchingService = matchingService;
    this.notificationService = notificationService;
  }

  viewMatchedOpportunities(volunteer) { return this.matchingService.findMatches(volunteer); }

  applyToOpportunity(volunteer, opportunity) {
    const appId = Date.now();
    const application = { applicationId: appId, volunteerId: volunteer.userId, opportunityId: opportunity.opportunityId, status: 'Pending', submissionDate: new Date().toISOString() };
    this.repository.save(application);
    this.notificationService.sendInAppNotification(volunteer.userId, `Applied to ${opportunity.title}`);
    return application;
  }
}
