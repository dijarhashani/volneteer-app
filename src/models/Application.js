// Application model (UML: Application)
export class Application {
  constructor(applicationId, volunteerId, opportunityId, status = 'Pending', submissionDate = new Date()) {
    this.applicationId = applicationId;
    this.volunteerId = volunteerId;
    this.opportunityId = opportunityId;
    this.status = status;
    this.submissionDate = submissionDate;
  }

  submitApplication() { return `Application ${this.applicationId} submitted`; }
  updateStatus(newStatus) { this.status = newStatus; return this.status; }
}
