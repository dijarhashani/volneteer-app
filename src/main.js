// Entry point demonstrating the Volunteer Matching app with patterns:
// - Strategy (matching algorithms)
// - Observer (notifications)
// - State (application lifecycle)
// - Repository + Singleton + DI (infrastructure)

import { Volunteer } from './models/Volunteer.js';
import { Opportunity } from './models/Opportunity.js';
import { Admin } from './models/Admin.js';
import { Organization } from './models/Organization.js';
import { Application } from './models/Application.js';

import { DataRepository } from './repository/DataRepository.js';

import { MatchingService } from './services/MatchingService.js';
import { SkillBasedMatchingStrategy } from './services/matching/SkillBasedMatchingStrategy.js';

import { NotificationService } from './services/NotificationService.js';
import { EmailNotificationObserver } from './services/notifications/EmailNotificationObserver.js';
import { InAppNotificationObserver } from './services/notifications/InAppNotificationObserver.js';

import { AdminController } from './controllers/AdminController.js';
import { OrganizationController } from './controllers/OrganizationController.js';
import { VolunteerController } from './controllers/VolunteerController.js';

// Composition root (Dependency Injection)
const repository = new DataRepository();

// Notification service (Observer Subject)
const notifier = new NotificationService();
notifier.addObserver(new EmailNotificationObserver());
notifier.addObserver(new InAppNotificationObserver());

// Matching service (Strategy Context)
const matchingService = new MatchingService(
  () => repository._all('Opportunity'),
  new SkillBasedMatchingStrategy()
);

// Controllers (MVC-ish)
const adminCtrl = new AdminController(repository, notifier);
const orgCtrl = new OrganizationController(repository);
const volCtrl = new VolunteerController(repository, matchingService, notifier);

// --- Seed sample data ---

// Admin and organization
const admin = new Admin(1, 'Admin Alice', 'admin@example.com', 'secret');
const org = new Organization(1, 'Helping Hands', { email: 'contact@help.org' });

// Volunteer
const volunteer = new Volunteer(
  100,
  'Volunteer Bob',
  'bob@example.com',
  'pass',
  ['teaching', 'cooking', 'first-aid'],
  { weekdays: ['Mon', 'Wed'], hours: '17:00-20:00' },
  'Prishtina'
);

// Opportunities
const opp1 = new Opportunity(
  10,
  'Teach English',
  'Evening English classes for kids',
  ['teaching'],
  'Prishtina'
);

const opp2 = new Opportunity(
  11,
  'Community Kitchen',
  'Help cook and serve meals',
  ['cooking'],
  'Prishtina'
);

const opp3 = new Opportunity(
  12,
  'Remote Translation',
  'Translate short documents',
  ['translation'],
  'Online'
);

// Persist entities
repository.save(admin);
repository.save(org);
repository.save(volunteer);
repository.save(opp1);
repository.save(opp2);
repository.save(opp3);

// --- Use cases ---

// 1. Organization creates a new opportunity through controller
const opp4 = new Opportunity(
  13,
  'First Aid Workshop',
  'Assist in first-aid training sessions',
  ['first-aid', 'teaching'],
  'Prishtina'
);
orgCtrl.createOpportunity(opp4);

// 2. Volunteer views matched opportunities (Strategy in action)
const matches = volCtrl.viewMatchedOpportunities(volunteer);
console.log('Matches for Volunteer Bob:', matches.map(m => m.title));

// 3. Volunteer applies to the best match
if (matches.length > 0) {
  const chosen = matches[0];
  const application = volCtrl.applyToOpportunity(volunteer, chosen);
  console.log('Application created with status:', application.status);

  // 4. Admin approves the application (State pattern)
  const approvedApplication = adminCtrl.approveApplication(application.applicationId);
  console.log('Application new status:', approvedApplication.status);
}

// This file is mainly for demonstration / manual testing.
// In a real app you would expose controllers via HTTP or a UI layer.
