// User model (UML: User)
export class User {
  constructor(userId, name, email, password) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password; // NOTE: placeholder; do not store plaintext in production
  }

  register() { return `User ${this.name} registered`; }
  login()    { return `User ${this.name} logged in`; }
  logout()   { return `User ${this.name} logged out`; }
}
