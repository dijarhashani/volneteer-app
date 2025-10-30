// MatchingService (UML: findMatches(volunteer: Volunteer) : List<Opportunity>)
export class MatchingService {
  constructor(opportunitiesProvider) {
    this.getOpportunities = opportunitiesProvider || (() => []);
  }

  findMatches(volunteer) {
    const opportunities = this.getOpportunities();
    const vSkills = new Set(volunteer.skills || []);
    const matches = [];
    for (const op of opportunities) {
      const required = op.requiredSkills || [];
      const intersection = required.filter(s => vSkills.has(s));
      if (intersection.length > 0) matches.push(op);
    }
    return matches.sort((a, b) => 
      (b.requiredSkills || []).filter(s => vSkills.has(s)).length - 
      (a.requiredSkills || []).filter(s => vSkills.has(s)).length
    );
  }
}
