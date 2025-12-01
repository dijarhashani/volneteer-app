// Volunteer model (UML: Volunteer extends User)
import { User } from './User.js';

export class Volunteer extends User {
  constructor(userId, name, email, password, skills = [], availability = {}, location = null) {
    super(userId, name, email, password);
    this.skills = skills;
    this.availability = availability;
    this.location = location;
  }

  updateProfile(data = {}) {
    Object.assign(this, data);
    return `Volunteer ${this.userId} profile updated`;
  }

  viewMatchedOpportunities(matchingService) {
    return matchingService.findMatches(this);
  }
}
