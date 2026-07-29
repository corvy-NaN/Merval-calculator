import { CompanyFinancialData, ValuationResults } from "../types";


export function calculateEps(netIncome: number, sharesOutstanding: number): number {
  return netIncome / sharesOutstanding;
}

export function calculatePe(price: number, eps: number): number {
  return price / eps;
}

export function calculateMarketCap(price: number, sharesOutstanding: number): number {
  return price * sharesOutstanding;
}

export function calculateEv(marketCap: number, totalDebt: number, cash: number): number {
  return marketCap + totalDebt - cash;
}

export function calculateEvEbitda(ev: number, ebitda: number): number {
  return ev / ebitda;
}

export function calculatePs(marketCap: number, revenue: number): number {
  return marketCap / revenue;
}

export function calculateFcf(operatingCashFlow: number, capex: number): number {
  return operatingCashFlow - capex;
}

export function calculatePfcf(marketCap: number, fcf: number): number {
  return marketCap / fcf;
}

export function calculateBookValuePerShare(equity: number, sharesOutstanding: number): number {
  return equity / sharesOutstanding;
}

export function calculatePb(price: number, bookValuePerShare: number): number {
  return price / bookValuePerShare;
}

export function calculateValuation(data: CompanyFinancialData): ValuationResults {
  const eps = calculateEps(data.netIncome, data.sharesOutstanding);
  const marketCap = calculateMarketCap(data.stockPrice, data.sharesOutstanding);
  const ev = calculateEv(marketCap, data.totalDebt, data.cash);
  const fcf = calculateFcf(data.operatingCashFlow, data.capex);
  const bookValuePerShare = calculateBookValuePerShare(data.equity, data.sharesOutstanding);
  

  return {
    eps,
    pe: calculatePe(data.stockPrice, eps),
    pb: calculatePb(data.stockPrice, bookValuePerShare),
    marketCap,
    ev,
    evEbitda: calculateEvEbitda(ev, data.ebitda),
    ps: calculatePs(marketCap, data.revenue),
    fcf,
    pfcf: calculatePfcf(marketCap, fcf),
    bookValuePerShare,
  };
}