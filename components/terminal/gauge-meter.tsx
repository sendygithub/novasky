"use client";

import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

interface GaugeMeterProps {
  value: number;
  label: string;
}

export function GaugeMeter({ value, label }: GaugeMeterProps) {
  const data = [
    {
      name: label,
      value,
      fill: value >= 70 ? "#00FF66" : value >= 50 ? "#FFC107" : "#FF4444",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <RadialBarChart
        width={220}
        height={220}
        cx="50%"
        cy="50%"
        innerRadius="70%"
        outerRadius="100%"
        barSize={18}
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />

        <RadialBar background dataKey="value" cornerRadius={10} />
      </RadialBarChart>

      <div className="-mt-20 text-center">
        <div className="text-5xl font-bold text-green-500">{value}%</div>

        <div className="text-xs text-zinc-400 mt-1">{label}</div>
      </div>
    </div>
  );
}
