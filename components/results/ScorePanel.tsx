import { TotalScore } from "@/lib/calculations";
import { Warning } from "@/lib/calculations";

interface ScorePanelProps {
    score: TotalScore | null;
    warnings: Warning[];
}

function scoreColor(score: number): string {
  if (score >= 70) return "text-green-400";
  if (score >= 40) return "text-yellow-400";
  return "text-red-400";
}

export default function ScorePanel({ score, warnings }: ScorePanelProps) {
  if (!score) {
    return (
      <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-6">
        <p className="text-gray-500 text-sm">Fill in the form to see the score.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">

      <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xs text-gray-500 uppercase tracking-wide">Overall score</h2>
          <span className={`text-3xl font-medium ${scoreColor(score.total)}`}>
            {score.total}/100
          </span>
        </div>
        <p className={`text-sm font-medium ${scoreColor(score.total)}`}>{score.label}</p>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#2a2d3a]">
          {[
            { label: "Valuation", block: score.valuation },
            { label: "Profitability", block: score.profitability },
            { label: "Risk", block: score.risk },
            { label: "Liquidity", block: score.liquidity },
          ].map(({ label, block }) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{label}</span>
              <span className={`text-sm font-medium ${scoreColor(block.score)}`}>
                {block.score}/100
              </span>
            </div>
          ))}
        </div>
      </div>

      {warnings.length > 0 && (
        <div className="flex flex-col gap-2">
          {warnings.map((w, i) => (
            <div
              key={i}
              className={`rounded-xl px-4 py-3 text-sm flex flex-col gap-1 ${
                w.severity === "critical"
                  ? "bg-red-950 border border-red-800"
                  : "bg-yellow-950 border border-yellow-800"
              }`}
            >
              <span className={`font-medium ${w.severity === "critical" ? "text-red-400" : "text-yellow-400"}`}>
                {w.severity === "critical" ? "⚠ Critical" : "⚡ Caution"} — {w.field}
              </span>
              <span className="text-gray-300">{w.message}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}