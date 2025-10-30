export class Opportunity {
  constructor(opportunityId, title, description, location, date, requiredSkills = []) {
    this.opportunityId = opportunityId;
    this.title = title;
    this.description = description;
    this.location = location;
    this.date = date;
    this.requiredSkills = requiredSkills;
  }

  getDetails() {}
  updateOpportunity() {}
}
