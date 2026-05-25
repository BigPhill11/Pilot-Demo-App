/**
 * Interactive chart configs for microeconomics lessons.
 * Each lesson uses unique stateId values — registered in economics-visual-registry.
 */

export type SupplyDemandState =
  | 'demand-curve'
  | 'movement-along-demand'
  | 'demand-shift-right'
  | 'demand-shift-left'
  | 'supply-curve'
  | 'movement-along-supply'
  | 'supply-shift-right'
  | 'supply-shift-left'
  | 'equilibrium'
  | 'shortage'
  | 'surplus'
  | 'demand-increase-equilibrium'
  | 'supply-increase-equilibrium';

export type ElasticityState =
  | 'inelastic-steep'
  | 'elastic-flat'
  | 'perfect-inelastic'
  | 'perfect-elastic'
  | 'substitutes-effect'
  | 'necessity-luxury'
  | 'time-horizon'
  | 'revenue-elastic'
  | 'revenue-inelastic'
  | 'income-normal'
  | 'income-inferior'
  | 'cross-complement'
  | 'cross-substitute'
  | 'supply-elastic';

export type UtilityBudgetState =
  | 'mu-declining'
  | 'total-vs-marginal'
  | 'diminishing-mu'
  | 'budget-line'
  | 'budget-pivot'
  | 'opportunity-cost-slope'
  | 'budget-shift'
  | 'mu-per-dollar'
  | 'utility-max-rule'
  | 'equal-marginal'
  | 'consumer-surplus'
  | 'surplus-shrink';

export type MarketStructureState =
  | 'spectrum'
  | 'perfect-competition'
  | 'price-taker'
  | 'monopolistic'
  | 'oligopoly'
  | 'monopoly-firm-demand'
  | 'monopoly-mr'
  | 'deadweight-loss';

export type MarketFailureState =
  | 'failure-overview'
  | 'negative-externality'
  | 'positive-externality'
  | 'tax-wedge'
  | 'subsidy-wedge'
  | 'public-goods-matrix'
  | 'common-resource'
  | 'price-ceiling'
  | 'price-floor'
  | 'information-asymmetry';

export interface SupplyDemandChartConfig {
  type: 'supply-demand';
  stateId: SupplyDemandState;
  caption?: string;
}

export interface ElasticityChartConfig {
  type: 'elasticity';
  stateId: ElasticityState;
  caption?: string;
}

export interface UtilityBudgetChartConfig {
  type: 'utility-budget';
  stateId: UtilityBudgetState;
  caption?: string;
}

export interface MarketStructureChartConfig {
  type: 'market-structure';
  stateId: MarketStructureState;
  caption?: string;
}

export interface MarketFailureChartConfig {
  type: 'market-failure';
  stateId: MarketFailureState;
  caption?: string;
}

export type EconomicsChartConfig =
  | SupplyDemandChartConfig
  | ElasticityChartConfig
  | UtilityBudgetChartConfig
  | MarketStructureChartConfig
  | MarketFailureChartConfig;

export function chartRegistryKey(config: EconomicsChartConfig): string {
  return `${config.type}:${config.stateId}`;
}
