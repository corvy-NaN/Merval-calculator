"use client";

import { useState } from "react";

export default function InfoPanel() {
    const [isOpen, setIsOpen] = useState(false);
    
     return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg transition-colors"
      >
        ? Guide
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="w-80 bg-[#1a1d27] border-l border-[#2a2d3a] overflow-y-auto p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-white font-medium">How to use</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>

            <section className="flex flex-col gap-2">
              <h3 className="text-xs text-gray-500 uppercase tracking-wide">What is this?</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                A financial analysis tool for stocks listed on the Merval. Fill in the company data and the calculator computes key ratios automatically.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h3 className="text-xs text-gray-500 uppercase tracking-wide">How to fill the form</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Data can be found in the company's annual or quarterly financial statements (balance sheet, income statement, cash flow statement). All values in ARS.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h3 className="text-xs text-gray-500 uppercase tracking-wide">Traffic lights</h3>
              <div className="flex flex-col gap-1 text-sm">
                <span className="text-green-400">🟢 Green — healthy range</span>
                <span className="text-yellow-400">🟡 Yellow — neutral, watch closely</span>
                <span className="text-red-400">🔴 Red — potential risk</span>
                <span className="text-gray-500 mt-2 text-xs">Thresholds are general references, not investment advice.</span>
              </div>
            </section>

            <section className="flex flex-col gap-2">
              <h3 className="text-xs text-gray-500 uppercase tracking-wide">Blocks</h3>
              <div className="flex flex-col gap-2 text-sm text-gray-300">
                <p><span className="text-white font-medium">Valuation</span> — is the stock cheap or expensive?</p>
                <p><span className="text-white font-medium">Profitability</span> — is the business good or mediocre?</p>
                <p><span className="text-white font-medium">Risk</span> — could it sink on its own?</p>
                <p><span className="text-white font-medium">Liquidity</span> — does it have enough cash to survive?</p>
              </div>
            </section>

            <p className="text-xs text-gray-600 mt-auto">
              This tool is for informational purposes only and does not constitute investment advice.
            </p>
          </div>
        </div>
      )}
    </>
  );
}