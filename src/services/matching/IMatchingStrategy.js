// Strategy interface (by convention) for matching volunteers to opportunities

export class IMatchingStrategy {
  // eslint-disable-next-line no-unused-vars
  findMatches(volunteer, opportunities) {
    throw new Error('findMatches(volunteer, opportunities) must be implemented by strategy');
  }
}
