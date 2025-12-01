// SkillBasedMatchingStrategy: matches opportunities based on overlapping skills

import { IMatchingStrategy } from './IMatchingStrategy.js';

export class SkillBasedMatchingStrategy extends IMatchingStrategy {
  findMatches(volunteer, opportunities) {
    const vSkills = new Set(volunteer.skills || []);
    const matches = [];

    for (const op of opportunities) {
      const required = op.requiredSkills || [];
      const intersection = required.filter(s => vSkills.has(s));
      if (intersection.length > 0) {
        matches.push(op);
      }
    }

    return matches.sort((a, b) => {
      const aCount = (a.requiredSkills || []).filter(s => vSkills.has(s)).length;
      const bCount = (b.requiredSkills || []).filter(s => vSkills.has(s)).length;
      return bCount - aCount;
    });
  }
}
