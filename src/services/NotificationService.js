// NotificationService (UML: sendEmail, sendInAppNotification)
export class NotificationService {
  sendEmail(recipient, message) { return `Email to ${recipient}: ${message}`; }
  sendInAppNotification(userId, message) { return `Notify user ${userId}: ${message}`; }
}
