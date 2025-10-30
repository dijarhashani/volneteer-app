import { MatchingService } from "../services/MatchingService.js";
import { NotificationService } from "../services/NotificationService.js";

export class VolunteerController {
  constructor() {
    this.matcher = new MatchingService();
    this.notifier = new NotificationService();
  }

  searchAndApply(volunteer, opportunities) {
    const matches = this.matcher.findMatches(volunteer, opportunities);
    this.notifier.sendInAppNotification(volunteer.userId, "Found new matches!");
    return matches;
  }
}
