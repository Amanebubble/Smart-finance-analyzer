import type { ComparisonType, FinancialRecord, PeriodComparison } from '../../shared/types';

export function growthRate(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export function comparePeriods(
  current: number,
  previous: number,
  comparisonType: ComparisonType
): PeriodComparison {
  return {
    current,
    previous,
    difference: current - previous,
    growthRate: growthRate(current, previous),
    comparisonType
  };
}

export function sumByPeriod(records: FinancialRecord[], period: string): number {
  return records
    .filter((record) => record.period === period)
    .reduce((acc, record) => acc + record.amount, 0);
}
