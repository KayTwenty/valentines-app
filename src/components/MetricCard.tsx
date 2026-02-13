import { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: number;
  icon: ReactNode;
}

export function MetricCard({ label, value, icon }: MetricCardProps) {
  return (
    <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-lg md:rounded-xl p-3 md:p-4 border-2 border-pink-900/30 shadow-lg">
      <div className="text-2xl md:text-3xl mb-2 text-pink-400">{icon}</div>
      <div className="text-xl md:text-2xl font-bold text-pink-400 mb-1">{value}%</div>
      <div className="text-xs md:text-sm text-gray-300 font-medium">{label}</div>
    </div>
  );
}
