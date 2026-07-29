import { CompanyFinancialData, LiquidityResults } from "../types";


export function calculateCurrentRatio(currentAssets: number, currentLiabilities: number): number {
  return currentAssets / currentLiabilities;
}

export function calculateCashRatio(cash: number, currentLiabilities: number): number {
  return cash / currentLiabilities;
}

export function calculateLiquidity(data: CompanyFinancialData): LiquidityResults{
  const currentRatio = calculateCurrentRatio(data.currentAssets, data.currentLiabilities);
  const cashRatio = calculateCashRatio(data.cash, data.currentLiabilities);

  return {
    currentRatio,
    cashRatio,
  };
}