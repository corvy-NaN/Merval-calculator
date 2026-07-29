"use client";

import { useState } from "react";
import { CompanyFinancialData, ValuationResults, ProfitabilityResults, LiquidityResults, RiskResults } from "@/lib/types";
import { calculateValuation } from "@/lib/calculations/valuation";
import { calculateProfitability } from "@/lib/calculations/profitability";
import { calculateRisk } from "@/lib/calculations/risk";
import { calculateLiquidity } from "@/lib/calculations/liquidity";
import InputForm from "@/components/ui/InputForm";
import ResultsTabs from "@/components/results/ResultsTabs";
import InfoPanel from "@/components/ui/InfoPanel";

export default function Home() {
  const [valuation, setValuation] = useState<ValuationResults | null>(null);
  const [profitability, setProfitability] = useState<ProfitabilityResults | null>(null);
  const [liquidity, setLiquidity]= useState<LiquidityResults | null>(null);
  const [risk, setRisk] = useState<RiskResults | null>(null);

  function handleDataChange(data: CompanyFinancialData){
    setValuation(calculateValuation(data));
    setProfitability(calculateProfitability(data));
    setRisk(calculateRisk(data));
    setLiquidity(calculateLiquidity(data));
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <header className="border-b border-[#2a2d3a] px-6 py-4">
        <h1 className="text-lg font-medium text-white">Merval Calculator</h1>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 gap-8">
        <InputForm onChange={handleDataChange} />
        <ResultsTabs
          valuation={valuation}
          profitability={profitability}
          liquidity={liquidity}
          risk={risk}
        />
      </main>
      <InfoPanel />
    </div>
  );
}