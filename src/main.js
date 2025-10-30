// Entry point demonstrating the UML sequence
import { Volunteer } from './models/Volunteer.js';
import { Opportunity } from './models/Opportunity.js';
import { Admin } from './models/Admin.js';
import { Organization } from './models/Organization.js';

import { DataRepository } from './repository/DataRepository.js';
import { MatchingService } from './services/MatchingService.js';
import { NotificationService } from './services/NotificationService.js';
import { AdminController } from './controllers/AdminController.js';
import { OrganizationController } from './controllers/OrganizationController.js';
import { VolunteerController } from './controllers/VolunteerController.js';

const repository = new DataRepository();
const notifier = new NotificationService();

// Seed data
const org = new Organization(100, 'City Helpers', 'contact@cityhelpers.org');
const opp1 = new Opportunity(501, 'Food Drive', 'Distribute food to families', 'City Center', '2025-11-10', ['cooking', 'packing']);
const opp2 = new Opportunity(502, 'After-School Tutor', 'Help students with homework', 'Community Hall', '2025-11-12', ['teaching']);
repository.save(opp1);
repository.save(opp2);

const matching = new MatchingService(() => repository._all('Opportunity'));

const adminCtrl = new AdminController(repository, notifier);
const orgCtrl = new OrganizationController(repository);
const volCtrl = new VolunteerController(repository, matching, notifier);

// Create volunteer
const vol = new Volunteer(1, 'Alice', 'alice@example.com', 'secret', ['teaching', 'first-aid'], 'Weekends');

// Organization posts opportunity (already saved opp1/opp2)
orgCtrl.createOpportunity(opp1);

// Volunteer views matches
const matches = volCtrl.viewMatchedOpportunities(vol);
console.log('Matches for Alice:', matches.map(m => m.title));

// Volunteer applies to the best match
const chosen = matches[0];
const app = volCtrl.applyToOpportunity(vol, chosen);
console.log('Application created:', app);

// Admin approves opportunity (demonstration)
const approvedOpp = adminCtrl.approveOpportunity(chosen.opportunityId);
console.log('Approved opportunity:', approvedOpp.title, approvedOpp.approved);

// Notifications
console.log(notifier.sendEmail(vol.email, 'Thanks for applying!'));
