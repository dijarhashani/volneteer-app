// Organization model (UML: Organization)
export class Organization {
  constructor(orgId, orgName, contactInfo) {
    this.orgId = orgId;
    this.orgName = orgName;
    this.contactInfo = contactInfo;
  }

  createOpportunity(opportunity) { return opportunity; }
  viewApplications(applications = []) { return applications.filter(a => a && a.opportunityId); }
}
