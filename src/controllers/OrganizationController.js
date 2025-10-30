// src/controllers/OrganizationController.js
import { NotificationService } from "../services/NotificationService.js";
import { DataRepository } from "../repository/DataRepository.js";

export class OrganizationController {
  constructor({ repository = new DataRepository(), notifier = new NotificationService() } = {}) {
    this.repository = repository;   // persistence abstraction
    this.notifier = notifier;       // notification abstraction
  }

  createOpportunity(org, opportunity) {
    // 1) Basic validation could be done here (SRP: keep validation local)
    // 2) Persist opportunity via repository
    this.repository.save(opportunity);

    // 3) Notify org (and optionally potential volunteers later)
    this.notifier.sendInAppNotification(org.userId, `Opportunity "${opportunity.title}" created.`);
    return opportunity;
  }

  updateOpportunity(opportunityId, updates) {
    const opp = this.repository.fetchById(opportunityId);
    if (!opp) throw new Error("Opportunity not found");
    Object.assign(opp, updates);
    this.repository.update(opp);
    // Notify relevant parties
    this.notifier.sendInAppNotification(opp.orgId, `Opportunity "${opp.title}" updated.`);
    return opp;
  }

  viewApplications(opportunityId) {
    // Returns a list of applications - repository can filter by opportunityId
    // For design phase, return repository.fetchById or similar stub
    // In real phase, repository would have dedicated query: fetchApplicationsByOpportunity(opportunityId)
    const opp = this.repository.fetchById(opportunityId);
    return opp?.applications || [];
  }
}
