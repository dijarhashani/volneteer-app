// VolunteerController (UML: interacts with Volunteer methods)

import { Application } from '../models/Application.js';

export class VolunteerController {
  constructor(repository, matchingService, notificationService) {
    this.repository = repository;
    this.matchingService = matchingService;
    this.notificationService = notificationService;
  }

  viewMatchedOpportunities(volunteer) {
    return this.matchingService.findMatches(volunteer);
  }

  applyToOpportunity(volunteer, opportunity) {
    const appId = Date.now();
    const application = new Application(
      appId,
      volunteer.userId,
      opportunity.opportunityId,
      'Pending',
      new Date()
    );

    this.repository.save(application);
    this.notificationService.notifyApplicationSubmitted(volunteer, opportunity);

    return application;
  }
}
