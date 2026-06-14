import { cn } from "@/lib/utils";

interface PanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Panel({ title, children, className }: PanelProps) {
  return (
    <div className={cn("border border-zinc-700 bg-[#080808]", className)}>
      <div className="border-b border-zinc-700 bg-black px-2 py-1">
        <h3 className="text-[11px] font-bold uppercase tracking-wide text-yellow-400">
          {title}
        </h3>
      </div>

      <div className="p-2">{children}</div>
    </div>
  );
}
