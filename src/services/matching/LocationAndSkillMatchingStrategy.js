// LocationAndSkillMatchingStrategy: matches on location + skills

import { IMatchingStrategy } from './IMatchingStrategy.js';

export class LocationAndSkillMatchingStrategy extends IMatchingStrategy {
  findMatches(volunteer, opportunities) {
    const vSkills = new Set(volunteer.skills || []);
    const vLocation = volunteer.location || null;

    const matches = [];

    for (const op of opportunities) {
      const required = op.requiredSkills || [];
      const skillMatchCount = required.filter(s => vSkills.has(s)).length;
      const locationMatch = !vLocation || !op.location || op.location === vLocation;

      if (skillMatchCount > 0 && locationMatch) {
        matches.push({ op, skillMatchCount });
      }
    }

    // sort by skill matches desc
    matches.sort((a, b) => b.skillMatchCount - a.skillMatchCount);
    return matches.map(m => m.op);
  }
}
