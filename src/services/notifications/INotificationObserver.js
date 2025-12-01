// Observer interface for notification channels

export class INotificationObserver {
  update(notification) {
    throw new Error('update(notification) must be implemented by observer');
  }
}
