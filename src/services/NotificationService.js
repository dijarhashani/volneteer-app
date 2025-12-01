// NotificationService as Subject in Observer pattern

export class NotificationService {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notify(notification) {
    for (const observer of this.observers) {
      observer.update(notification);
    }
  }

  notifyApplicationSubmitted(volunteer, opportunity) {
    this.notify({
      type: 'APPLICATION_SUBMITTED',
      userId: volunteer.userId,
      email: volunteer.email,
      message: `You applied to ${opportunity.title}`
    });
  }

  notifyApplicationApproved(volunteer, opportunity) {
    this.notify({
      type: 'APPLICATION_APPROVED',
      userId: volunteer.userId,
      email: volunteer.email,
      message: `Your application for ${opportunity.title} was approved`
    });
  }
}
