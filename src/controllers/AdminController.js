// src/controllers/AdminController.js
import { DataRepository } from "../repository/DataRepository.js";
import { NotificationService } from "../services/NotificationService.js";

export class AdminController {
  constructor({ repository = new DataRepository(), notifier = new NotificationService() } = {}) {
    this.repository = repository;
    this.notifier = notifier;
  }

  approveOpportunity(adminUser, opportunityId) {
    const opp = this.repository.fetchById(opportunityId);
    if (!opp) throw new Error("Opportunity not found");

    opp.approved = true;
    this.repository.update(opp);

    // Send notifications to organization and optionally to matched volunteers
    this.notifier.sendInAppNotification(opp.orgId, `Your opportunity "${opp.title}" was approved by admin ${adminUser.name}.`);
    // Optionally: notify matched volunteers (requires matching logic)
    return opp;
  }

  removeOpportunity(adminUser, opportunityId) {
    const opp = this.repository.fetchById(opportunityId);
    if (!opp) throw new Error("Opportunity not found");

    this.repository.delete(opportunityId);
    this.notifier.sendInAppNotification(opp.orgId, `Your opportunity "${opp.title}" was removed by admin ${adminUser.name}.`);
    return true;
  }

  manageUsers(action, userId, payload) {
    // Generic admin user management entrypoint (e.g., suspend, restore, promote)
    const user = this.repository.fetchById(userId);
    if (!user) throw new Error("User not found");

    switch (action) {
      case "suspend":
        user.suspended = true;
        this.repository.update(user);
        this.notifier.sendInAppNotification(user.userId, "Your account has been suspended by an admin.");
        break;
      case "restore":
        user.suspended = false;
        this.repository.update(user);
        this.notifier.sendInAppNotification(user.userId, "Your account has been restored by an admin.");
        break;
      case "promote":
        // Example: change role or add admin flag
        user.role = payload?.role || user.role;
        this.repository.update(user);
        break;
      default:
        throw new Error("Unsupported admin action");
    }

    return user;
  }

  viewReports(criteria = {}) {
    // Stub: in phase 2 this would generate aggregated reports (counts, activity, esc.)
    // For now, return repository.fetchReports(criteria) when implemented.
    if (this.repository.fetchReports) {
      return this.repository.fetchReports(criteria);
    }
    return { message: "Reports subsystem not implemented yet" };
  }
}
