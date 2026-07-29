interface MetricCardProps {
    label: string;
    value: number | null;
    status: "green" | "yellow" | "red" | "neutral";
}

export default function MetricCard({ label, value, status }: MetricCardProps) {
    const statusStyles = {
        green: "text-green-400",
        yellow: "text-yellow-400",
        red: "text-red-400",
        neutral: "text-gray-500",
    };

    const displayValue = value !== null ? value.toFixed(2) : "--";

    return (
    <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-xl p-4 flex flex-col gap-1">
      <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
      <span className={`text-2xl font-medium ${statusStyles[status]}`}>
        {displayValue}
      </span>
    </div>
  );
}
