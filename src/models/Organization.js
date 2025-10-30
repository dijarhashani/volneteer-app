import { User } from "./User.js";

export class Organization extends User {
  constructor(userId, name, email, password, orgName, contactInfo) {
    super(userId, name, email, password);
    this.orgName = orgName;
    this.contactInfo = contactInfo;
  }

  createOpportunity() {}
  viewApplications() {}
}
