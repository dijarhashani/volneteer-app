// AdminController
// Uses Repository (DIP) + NotificationService + State pattern on Application

import { Application } from '../models/Application.js';

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

  approveApplication(applicationId) {
    const raw = this.repository.fetchById(applicationId, 'Application');
    if (!raw) throw new Error('Application not found');

    
    const application = new Application(
      raw.applicationId,
      raw.volunteerId,
      raw.opportunityId,
      raw.status,
      new Date(raw.submissionDate)
    );

    application.approve();
    this.repository.update(application);

    

    return application;
  }

  rejectApplication(applicationId) {
    const raw = this.repository.fetchById(applicationId, 'Application');
    if (!raw) throw new Error('Application not found');

    const application = new Application(
      raw.applicationId,
      raw.volunteerId,
      raw.opportunityId,
      raw.status,
      new Date(raw.submissionDate)
    );

    application.reject();
    this.repository.update(application);
    return application;
  }

  manageUsers() {
    
    return 'manageUsers executed';
  }

  viewReports() {
    
    return 'viewReports executed';
  }
}
