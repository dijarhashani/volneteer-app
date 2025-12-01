// MatchingService (Context in Strategy pattern)

export class MatchingService {
  constructor(opportunitiesProvider, strategy) {
    this.getOpportunities = opportunitiesProvider || (() => []);
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  findMatches(volunteer) {
    if (!this.strategy) {
      throw new Error('Matching strategy not set');
    }
    const opportunities = this.getOpportunities();
    return this.strategy.findMatches(volunteer, opportunities);
  }
}
