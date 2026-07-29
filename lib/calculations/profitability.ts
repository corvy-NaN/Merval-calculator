import { CompanyFinancialData, ProfitabilityResults } from "../types";


export function calculateRoe(netIncome: number, equity: number): number {
  return netIncome / equity;
}

export function calculateNetMargin(netIncome: number, revenue: number): number {
  return netIncome / revenue;
}

export function calculateRoa(netIncome: number, assets: number): number {
  return netIncome / assets;
}

export function calculateOperativeMargin(ebit: number, revenue: number): number {
  return ebit / revenue;
}

export function calculateProfitability(data: CompanyFinancialData): ProfitabilityResults{
const roe = calculateRoe(data.netIncome, data.equity);
const netMargin = calculateNetMargin(data.netIncome, data.revenue);
const roa = calculateRoa(data.netIncome, data.totalAssets);
const operatingMargin = calculateOperativeMargin(data.ebit, data.revenue);

return {
  roe,
  netMargin,
  roa,
  operatingMargin,
}
};