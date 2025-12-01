// Concrete Observer: sends email notifications

import { INotificationObserver } from './INotificationObserver.js';

export class EmailNotificationObserver extends INotificationObserver {
  constructor(emailSenderFn) {
    super();
    this.emailSenderFn = emailSenderFn || ((to, msg) => {
      const text = `Email to ${to}: ${msg}`;
      console.log(text);
      return text;
    });
  }

  update(notification) {
    if (!notification.email) return;
    this.emailSenderFn(notification.email, notification.message);
  }
}
