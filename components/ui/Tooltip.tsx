interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

export default function Tooltip({text, children }: TooltipProps) {
    return (
    <div className="relative group inline-flex items-center gap-1">
      {children}
      <span className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-48 text-xs text-gray-300 bg-[#0f1117] border border-[#2a2d3a] rounded-lg px-3 py-2 z-10">
        {text}
      </span>
    </div>
  );
}