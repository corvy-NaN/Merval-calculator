export interface CompanyFinancialData {
    stockPrice: number;
    sharesOutstanding: number;

    revenue: number;
    ebitda: number;
    ebit: number;
    netIncome: number;
    interestExpense: number;

    totalAssets: number;
    totalLiabilities: number;
    equity: number;
    totalDebt: number;
    cash: number;
    currentAssets: number;
    currentLiabilities: number;

    operatingCashFlow: number;
    capex: number;
}

export interface ValuationResults {
    eps: number;
    pe: number;
    pb: number;
    marketCap: number;
    ev: number;
    evEbitda: number;
    ps: number;
    fcf: number;
    pfcf: number;
    bookValuePerShare: number;
}

export interface ProfitabilityResults {
    roe: number;
    roa: number;
    netMargin: number;
    operatingMargin: number;
}

export interface LiquidityResults {
    currentRatio: number;
    cashRatio: number;
}

export interface RiskResults {
    netDebt: number;
    debtEbitda: number;
    debtEquity: number;
    interestCoverage: number;
}