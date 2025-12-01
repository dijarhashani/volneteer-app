// Concrete Observer: stores/display in-app notifications

import { INotificationObserver } from './INotificationObserver.js';

export class InAppNotificationObserver extends INotificationObserver {
  constructor(storeFn) {
    super();
    this.storeFn = storeFn || ((userId, msg) => {
      const text = `Notify user ${userId}: ${msg}`;
      console.log(text);
      return text;
    });
  }

  update(notification) {
    if (!notification.userId) return;
    this.storeFn(notification.userId, notification.message);
  }
}
