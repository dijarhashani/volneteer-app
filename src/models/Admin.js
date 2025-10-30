import { User } from "./User.js";

export class Admin extends User {
  constructor(userId, name, email, password) {
    super(userId, name, email, password);
  }

  approveOpportunity(oppId) {}
  manageUsers() {}
  viewReports() {}
}
