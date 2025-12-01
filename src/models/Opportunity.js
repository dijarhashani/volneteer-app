// Opportunity model (UML: Opportunity)
export class Opportunity {
  constructor(opportunityId, title, description, requiredSkills = [], location = null, approved = false) {
    this.opportunityId = opportunityId;
    this.title = title;
    this.description = description;
    this.requiredSkills = requiredSkills;
    this.location = location;
    this.approved = approved;
  }
}
