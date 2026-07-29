import { CompanyFinancialData, RiskResults } from "../types";


export function calculateNetDebt(debt: number, cash: number): number {
  return debt - cash;
}

export function calculateDebtEbitda(netDebt: number, ebitda: number): number {
  return netDebt / ebitda;
}

export function calculateDebtEquity(debt: number, equity: number): number {
  return debt / equity;
}

export function calculateInterestCoverage(ebit: number, interestExpense: number): number {
  return ebit / interestExpense;
}


export function calculateRisk(data: CompanyFinancialData): RiskResults{
  const netDebt = calculateNetDebt(data.totalDebt, data.cash);
  const debtEbitda = calculateDebtEbitda(netDebt, data.ebitda);
  const debtEquity = calculateDebtEquity(data.totalDebt, data.equity);
  const interestCoverage = calculateInterestCoverage(data.ebit, data.interestExpense);

  return{
    netDebt,
    debtEbitda,
    debtEquity,
    interestCoverage,
  };
}