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
import { calculateScore } from "@/lib/calculations/scoring";
import { getWarnings } from "@/lib/calculations/warnings";
import { TotalScore } from "@/lib/calculations/scoring";
import { Warning } from "@/lib/calculations/warnings";
import ScorePanel from "@/components/results/ScorePanel";

export default function Home() {
  const [valuation, setValuation] = useState<ValuationResults | null>(null);
  const [profitability, setProfitability] = useState<ProfitabilityResults | null>(null);
  const [liquidity, setLiquidity]= useState<LiquidityResults | null>(null);
  const [risk, setRisk] = useState<RiskResults | null>(null);
  const [score, setScore] = useState<TotalScore | null>(null);
  const [warnings, setWarnings] = useState<Warning[]>([]);

  function handleDataChange(data: CompanyFinancialData){
    const v = calculateValuation(data);
    const p = calculateProfitability(data);
    const r = calculateRisk(data);
    const l = calculateLiquidity(data);
    setValuation(v);
    setProfitability(p);
    setRisk(r);
    setLiquidity(l);
    setScore(calculateScore(v, p, r, l));
    setWarnings(getWarnings(data));
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <header className="border-b border-[#2a2d3a] px-6 py-4">
        <h1 className="text-lg font-medium text-white">Merval Calculator</h1>
      </header>
        <main className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 gap-8">
          <InputForm onChange={handleDataChange} />
            <div className="flex flex-col gap-6">
            <ResultsTabs
              valuation={valuation}
              profitability={profitability}
              liquidity={liquidity}
              risk={risk}
            />
          <ScorePanel score={score} warnings={warnings} />
          </div>
        </main>
      <InfoPanel />
    </div>
  );
}