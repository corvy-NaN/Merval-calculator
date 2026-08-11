import { CompanyFinancialData } from "@/lib/types";

export interface Warning {
    field: string;
    message: string;
    severity: "critical" | "caution";
}

export function getWarnings(data: CompanyFinancialData): Warning[] {
  const warnings: Warning[] = [];

  if (data.netIncome < 0) {
    warnings.push({
      field: "Net income",
      message: "The company is reporting negative net income.",
      severity: "critical",
    });
  }

  if (data.operatingCashFlow - data.capex < 0) {
    warnings.push({
      field: "Free cash flow",
      message: "Free cash flow is negative. The company is not generating cash.",
      severity: "critical",
    });
  }

  if (data.ebit > 0 && data.interestExpense > 0 && data.ebit / data.interestExpense < 1) {
    warnings.push({
      field: "Interest coverage",
      message: "The company cannot cover its interest payments with operating profit.",
      severity: "critical",
    });
  }

  if (data.totalDebt > data.equity * 2) {
    warnings.push({
      field: "Debt level",
      message: "Total debt is more than twice the equity. High leverage.",
      severity: "caution",
    });
  }

  if (data.currentAssets < data.currentLiabilities) {
    warnings.push({
      field: "Current ratio",
      message: "Current assets are below current liabilities. Short-term liquidity risk.",
      severity: "caution",
    });
  }

  return warnings;
}