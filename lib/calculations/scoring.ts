import { ValuationResults, ProfitabilityResults, RiskResults, LiquidityResults } from "@/lib/types";
import { getStatus } from "@/components/ui/TrafficLight";

export interface BlockScore {
    score: number;
    label: string;
}

export interface TotalScore {
    valuation: BlockScore;
    profitability: BlockScore;
    risk: BlockScore;
    liquidity: BlockScore;
    total: number;
    label: string;
}

function statusToPoints(status: "green" | "yellow" | "red" | "neutral"): number | null {
    if (status === "green") return 100;
    if (status === "yellow") return 50;
    if (status === "red") return 0;
    return null;
}

function average(points: (number | null)[]): number {
    const valid = points.filter((p): p is number => p !== null);
    if (valid.length === 0) return 0;
    return valid.reduce((sum, p) => sum + p, 0) / valid.length;
}

function scoreLabel(score: number): string {
    if (score >= 70) return "Solid";
    if (score >= 40) return "Moderate";
    return "At risk";
}

export function calculateScore(
    valuation: ValuationResults | null,
    profitability: ProfitabilityResults | null,
    risk: RiskResults | null,
    liquidity: LiquidityResults | null
): TotalScore {
    const valuationPoints = valuation ? [
        statusToPoints(getStatus(valuation.pe, { greenBelow: 10, redAbove: 25 })),
        statusToPoints(getStatus(valuation.pb, { greenBelow: 1.5, redAbove: 3 })),
        statusToPoints(getStatus(valuation.evEbitda, { greenBelow: 8, redAbove: 15 })),
        statusToPoints(getStatus(valuation.ps, { greenBelow: 2, redAbove: 5 })),
        statusToPoints(getStatus(valuation.pfcf, { greenBelow: 15, redAbove: 30 })),
    ] : [];

    const profitabilityPoints = profitability ? [
        statusToPoints(getStatus(profitability.roe, { greenAbove: 0.15, redBelow: 0.08 })),
        statusToPoints(getStatus(profitability.roa, { greenAbove: 0.05, redBelow: 0.02 })),
        statusToPoints(getStatus(profitability.netMargin, { greenAbove: 0.10, redBelow: 0.05 })),
        statusToPoints(getStatus(profitability.operatingMargin, { greenAbove: 0.15, redBelow: 0.05 })),
    ] : [];

    const riskPoints = risk ? [
        statusToPoints(getStatus(risk.debtEbitda, { greenBelow: 2, redAbove: 4 })),
        statusToPoints(getStatus(risk.debtEquity, { greenBelow: 1, redAbove: 2 })),
        statusToPoints(getStatus(risk.interestCoverage, { greenAbove: 3, redBelow: 1.5 })),
    ] : [];

    const liquidityPoints = liquidity ? [
        statusToPoints(getStatus(liquidity.currentRatio, { greenAbove: 2, redBelow: 1 })),
        statusToPoints(getStatus(liquidity.cashRatio, { greenAbove: 0.5, redBelow: 0.2 })),
    ] : [];

    const vScore = average(valuationPoints);
    const pScore = average(profitabilityPoints);
    const rScore = average(riskPoints);
    const lScore = average(liquidityPoints);

    const total = (vScore * 0.30) + (pScore * 0.25) + (rScore * 0.25) + (lScore * 0.20);

    return {
        valuation: { score: Math.round(vScore), label: scoreLabel(vScore)},
        profitability: { score: Math.round(pScore), label: scoreLabel(pScore)},
        risk: { score: Math.round(rScore), label: scoreLabel(rScore)},
        liquidity: { score: Math.round(lScore), label: scoreLabel(lScore)},
        total: Math.round(total),
        label: scoreLabel(total),
    };
}

