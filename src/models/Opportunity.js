// Opportunity model (UML: Opportunity)
export class Opportunity {
  constructor(opportunityId, title, description, location, date, requiredSkills = []) {
    this.opportunityId = opportunityId;
    this.title = title;
    this.description = description;
    this.location = location;
    this.date = date;
    this.requiredSkills = requiredSkills;
    this.approved = false;
  }

  getDetails() { return `${this.title} @ ${this.location} on ${this.date}`; }
  updateOpportunity(data = {}) { Object.assign(this, data); return this; }
}
