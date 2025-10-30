import { Volunteer } from "./models/Volunteer.js";
import { VolunteerController } from "./controllers/VolunteerController.js";

const volunteer = new Volunteer(1, "Benita", "benita@example.com", "pass123", ["Teaching"], "Weekends");
const controller = new VolunteerController();

const opportunities = []; // dummy data
controller.searchAndApply(volunteer, opportunities);

console.log("System simulation complete. (Design phase successful!)");
