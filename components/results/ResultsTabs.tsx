"use client";

import { useState } from "react";
import { ValuationResults, ProfitabilityResults, LiquidityResults, RiskResults } from "@/lib/types";
import MetricCard from "@/components/ui/MetricCard";
import { getStatus } from "@/components/ui/TrafficLight";

interface ResultsTabsProps {
    valuation: ValuationResults | null;
    profitability: ProfitabilityResults | null;
    liquidity: LiquidityResults | null;
    risk: RiskResults | null;
}

const TABS = ["Valuation", "Profitability", "Risk", "Liquidity"] as const;
type Tab = typeof TABS[number];

export default function ResultsTabs({ valuation, profitability, liquidity, risk}: ResultsTabsProps){
    const [activeTab, setActiveTab] = useState<Tab>("Valuation");

    return (
         <div className="flex flex-col gap-4">

      <div className="flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-[#1a1d27] text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {activeTab === "Valuation" && valuation && (
          <>
            <MetricCard label="P/E" value={valuation.pe} status={getStatus(valuation.pe, { greenBelow: 10, redAbove: 25 })} />
            <MetricCard label="P/B" value={valuation.pb} status={getStatus(valuation.pb, { greenBelow: 1.5, redAbove: 3 })} />
            <MetricCard label="EV/EBITDA" value={valuation.evEbitda} status={getStatus(valuation.evEbitda, { greenBelow: 8, redAbove: 15 })} />
            <MetricCard label="P/S" value={valuation.ps} status={getStatus(valuation.ps, { greenBelow: 2, redAbove: 5 })} />
            <MetricCard label="P/FCF" value={valuation.pfcf} status={getStatus(valuation.pfcf, { greenBelow: 15, redAbove: 30 })} />
            <MetricCard label="EPS" value={valuation.eps} status="neutral" />
          </>
        )}
        {activeTab === "Valuation" && !valuation && (
          <p className="text-gray-500 text-sm col-span-2">Fill in the form to see results.</p>
        )}
        {activeTab === "Profitability" && profitability && (
          <>
            <MetricCard label="ROE" value={profitability.roe} status={getStatus(profitability.roe, { greenAbove: 0.15, redBelow: 0.08 })} />
            <MetricCard label="ROA" value={profitability.roa} status={getStatus(profitability.roa, { greenAbove: 0.05, redBelow: 0.02 })} />
            <MetricCard label="Net margin" value={profitability.netMargin} status={getStatus(profitability.netMargin, { greenAbove: 0.10, redBelow: 0.05 })} />
            <MetricCard label="Operating margin" value={profitability.operatingMargin} status={getStatus(profitability.operatingMargin, { greenAbove: 0.15, redBelow: 0.05 })} />
          </>
        )}
        {activeTab === "Profitability" && !profitability && (
          <p className="text-gray-500 text-sm col-span-2">Fill in the form to see results.</p>
        )}
        {activeTab === "Risk" && risk && (
          <>
            <MetricCard label="Debt/EBITDA" value={risk.debtEbitda} status={getStatus(risk.debtEbitda, { greenBelow: 2, redAbove: 4 })} />
            <MetricCard label="Debt/Equity" value={risk.debtEquity} status={getStatus(risk.debtEquity, { greenBelow: 1, redAbove: 2 })} />
            <MetricCard label="Interest coverage" value={risk.interestCoverage} status={getStatus(risk.interestCoverage, { greenAbove: 3, redBelow: 1.5 })} />
            <MetricCard label="Net debt" value={risk.netDebt} status="neutral" />
            </>
        )}
        {activeTab === "Risk" && !risk && (
          <p className="text-gray-500 text-sm col-span-2">Fill in the form to see results.</p>
        )}
        {activeTab === "Liquidity" && liquidity && (
          <>
            <MetricCard label="Current ratio" value={liquidity.currentRatio} status={getStatus(liquidity.currentRatio, { greenAbove: 2, redBelow: 1 })} />
            <MetricCard label="Cash ratio" value={liquidity.cashRatio} status={getStatus(liquidity.cashRatio, { greenAbove: 0.5, redBelow: 0.2 })} />
           </>
        )}
        {activeTab === "Liquidity" && !liquidity && (
          <p className="text-gray-500 text-sm col-span-2">Fill in the form to see results.</p>
        )}
      </div>

    </div>
  );
}