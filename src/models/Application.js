export class Application {
  constructor(applicationId, status, submissionDate) {
    this.applicationId = applicationId;
    this.status = status;
    this.submissionDate = submissionDate;
  }

  submitApplication() {}
  updateStatus(newStatus) {}
}
