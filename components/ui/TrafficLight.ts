type Status = "green" | "yellow" | "red" | "neutral";

interface Thresholds {
    greenBelow?: number;
    greenAbove?: number;
    redAbove?: number;
    redBelow?: number;
}

export function getStatus(value: number | null, thresholds: Thresholds): Status {
    if (value === null) return "neutral";

    if(thresholds.greenBelow !== undefined && value < thresholds.greenBelow) return "green";
    if(thresholds.redAbove !== undefined && value > thresholds.redAbove) return "red";
    if(thresholds.greenAbove !== undefined && value > thresholds.greenAbove) return "green";
    if(thresholds.redBelow !== undefined && value < thresholds.redBelow) return "red";
    
    return "yellow";
}