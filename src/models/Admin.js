// Admin model (UML: Admin extends User)
import { User } from './User.js';

export class Admin extends User {
  constructor(adminId, name, email, password) {
    super(adminId, name, email, password);
    this.adminId = adminId;
  }
}
