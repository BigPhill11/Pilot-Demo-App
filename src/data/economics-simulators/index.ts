/**
 * Economics Simulators Index
 * 
 * Exports all simulator configurations for the 10 economics units.
 */

import { SimulatorConfig, EconomicsSimulatorId } from '@/types/economics-sim';

// Microeconomics Simulators
import { micro1MarketSim } from './micro-1-market-sim';
import { micro2ElasticitySim } from './micro-2-elasticity-sim';
import { micro3UtilitySim } from './micro-3-utility-sim';
import { micro4MarketPowerSim } from './micro-4-market-power-sim';
import { micro5PolicySim } from './micro-5-policy-sim';

// Macroeconomics Simulators
import { macro1GdpSim } from './macro-1-gdp-sim';
import { macro2JobsSim } from './macro-2-jobs-sim';
import { macro3InflationSim } from './macro-3-inflation-sim';
import { macro4FedSim } from './macro-4-fed-sim';
import { macro5FiscalSim } from './macro-5-fiscal-sim';

export const ECONOMICS_SIMULATORS: Record<EconomicsSimulatorId, SimulatorConfig> = {
  'micro-1-market-sim': micro1MarketSim,
  'micro-2-elasticity-sim': micro2ElasticitySim,
  'micro-3-utility-sim': micro3UtilitySim,
  'micro-4-market-power-sim': micro4MarketPowerSim,
  'micro-5-policy-sim': micro5PolicySim,
  'macro-1-gdp-sim': macro1GdpSim,
  'macro-2-jobs-sim': macro2JobsSim,
  'macro-3-inflation-sim': macro3InflationSim,
  'macro-4-fed-sim': macro4FedSim,
  'macro-5-fiscal-sim': macro5FiscalSim,
};

export const MICROECONOMICS_SIMULATORS: SimulatorConfig[] = [
  micro1MarketSim,
  micro2ElasticitySim,
  micro3UtilitySim,
  micro4MarketPowerSim,
  micro5PolicySim,
];

export const MACROECONOMICS_SIMULATORS: SimulatorConfig[] = [
  macro1GdpSim,
  macro2JobsSim,
  macro3InflationSim,
  macro4FedSim,
  macro5FiscalSim,
];

export const ALL_SIMULATORS: SimulatorConfig[] = [
  ...MICROECONOMICS_SIMULATORS,
  ...MACROECONOMICS_SIMULATORS,
];

export function getSimulatorById(id: EconomicsSimulatorId): SimulatorConfig | undefined {
  return ECONOMICS_SIMULATORS[id];
}

export function getSimulatorByUnitId(unitId: string): SimulatorConfig | undefined {
  return ALL_SIMULATORS.find(sim => sim.unitId === unitId);
}

export function getSimulatorIdByUnitId(unitId: string): EconomicsSimulatorId | undefined {
  const sim = getSimulatorByUnitId(unitId);
  return sim?.id;
}

export {
  micro1MarketSim,
  micro2ElasticitySim,
  micro3UtilitySim,
  micro4MarketPowerSim,
  micro5PolicySim,
  macro1GdpSim,
  macro2JobsSim,
  macro3InflationSim,
  macro4FedSim,
  macro5FiscalSim,
};
