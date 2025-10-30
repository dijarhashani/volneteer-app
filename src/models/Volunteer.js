import { User } from "./User.js";

export class Volunteer extends User {
  constructor(userId, name, email, password, skills = [], availability = "") {
    super(userId, name, email, password);
    this.skills = skills;
    this.availability = availability;
  }

  updateProfile() {}
  viewMatchedOpportunities() {}
}
