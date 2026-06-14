"use client";

import { Panel } from "@/components/terminal/panel";
import {
  TrendingUp,
  Activity,
  ShieldCheck,
  Target,
  Zap,
  Layers,
  Gauge,
  Compass,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#030303] p-3 text-zinc-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-300 antialiased selection:rounded">
      {/* BACKGROUND NEON GLOW DECORATION */}
      <div className="fixed top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* DASHBOARD GRID CONTAINER */}
      <div className="relative z-10 grid grid-cols-12 gap-1.5 max-w-[1600px] mx-auto">
        {/* ================= HEADER BLOCKS ================= */}

        {/* BLOCK 1: ASSET TICKER */}
        <Panel
          title="SYMBOL / ASSET"
          className="col-span-12 sm:col-span-6 lg:col-span-2 bg-[#09090b]/80 border-zinc-800/80 backdrop-blur-md hover:border-emerald-500/30 transition-all duration-300"
        >
          <div className="flex flex-col justify-between h-full pt-1">
            <div className="flex items-center justify-between">
              <span className="text-xl font-black tracking-widest text-white">
                XAUUSD
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                GOLD
              </span>
            </div>
            <div className="mt-2">
              <p className="text-4xl font-mono font-bold tracking-tight text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                2375.42
              </p>
              <p className="text-xs font-mono text-emerald-500/90 flex items-center gap-1 mt-0.5">
                <TrendingUp className="h-3 w-3" /> +12.36 (+0.52%)
              </p>
            </div>
          </div>
        </Panel>

        {/* BLOCK 2: RUNNING PRICE */}
        <Panel
          title="RUNNING PRICE"
          className="col-span-6 sm:col-span-3 lg:col-span-2 bg-[#09090b]/80 border-zinc-800/80 backdrop-blur-md"
        >
          <div className="flex flex-col justify-center h-full pt-2">
            <span className="text-[10px] font-mono text-zinc-500 block mb-1">
              SPOT FEED
            </span>
            <div className="text-3xl font-mono font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 rounded-lg py-2 text-center animate-pulse">
              2375.42
            </div>
          </div>
        </Panel>

        {/* BLOCK 3: GANN ROOT */}
        <Panel
          title="GANN MATRIX QUANT"
          className="col-span-6 sm:col-span-3 lg:col-span-2 bg-[#09090b]/80 border-zinc-800/80"
        >
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="bg-zinc-900/50 p-2 rounded border border-zinc-800/60 text-center">
              <span className="text-[9px] font-mono text-zinc-500 block mb-0.5">
                GANN ROOT
              </span>
              <span className="text-xl font-mono font-bold text-cyan-400">
                48.73
              </span>
            </div>
            <div className="bg-zinc-900/50 p-2 rounded border border-zinc-800/60 text-center">
              <span className="text-[9px] font-mono text-zinc-500 block mb-0.5">
                DEGREE
              </span>
              <span className="text-xl font-mono font-bold text-purple-400">
                8771.4
              </span>
            </div>
          </div>
        </Panel>

        {/* BLOCK 4: EXTRA ENGINE METRIC */}
        <Panel
          title="ALGO VOLATILITY"
          className="col-span-6 sm:col-span-3 lg:col-span-2 bg-[#09090b]/80 border-zinc-800/80"
        >
          <div className="flex flex-col justify-center h-full pt-1">
            <div className="flex justify-between text-xs font-mono border-b border-zinc-900 pb-1 mb-1 text-zinc-400">
              <span>ATR (14)</span>
              <span className="text-white font-medium">14.20</span>
            </div>
            <div className="flex justify-between text-xs font-mono text-zinc-400">
              <span>SPREAD</span>
              <span className="text-emerald-400 font-medium">0.12 Pips</span>
            </div>
          </div>
        </Panel>

        {/* BLOCK 5: MARKET STORY ENGINE */}
        <Panel
          title="MARKET STORY ENGINE"
          className="col-span-12 sm:col-span-9 lg:col-span-4 bg-[#09090b]/80 border-zinc-800/80"
        >
          <div className="grid grid-cols-2 gap-4 items-center pt-1">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-1">
                <span className="text-zinc-500">DOMINANT TREND</span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px]">
                  NRL UP
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-500">BIAS TARGET</span>
                <span className="text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded text-[10px]">
                  ATAS
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-950/40 to-zinc-900 p-2.5 rounded-xl border border-emerald-500/20 text-center shadow-inner">
              <span className="text-[9px] font-mono text-emerald-400/70 tracking-widest block mb-0.5">
                EXECUTION ZONE
              </span>
              <div className="text-xl font-black text-emerald-400 tracking-wider">
                BUY AREA
              </div>
            </div>
          </div>
        </Panel>

        {/* ================= MATRIX CONTENT BLOCKS ================= */}

        {/* BLOCK 6: TREND MATRIX TABLE */}
        <Panel
          title="ALGO TREND MATRIX SYSTEM"
          className="col-span-12 lg:col-span-9 bg-[#09090b]/80 border-zinc-800/80"
        >
          <div className="overflow-x-auto pt-1">
            <table className="w-full text-xs font-mono text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-amber-400/90 tracking-wider text-[10px]">
                  <th className="pb-2 font-bold">INTERVAL</th>
                  <th className="pb-2 font-bold">OPENING</th>
                  <th className="pb-2 font-bold">HIGH BAR (HB)</th>
                  <th className="pb-2 font-bold">LOW BAR (LB)</th>
                  <th className="pb-2 font-bold">MATRIX TREND</th>
                  <th className="pb-2 font-bold">VECTOR MOVE</th>
                  <th className="pb-2 font-bold text-right">
                    STRATEGIC TARGET
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {[
                  {
                    tf: "YEARLY",
                    open: "2062.10",
                    hb: "2450.00",
                    lb: "1984.30",
                  },
                  {
                    tf: "MONTHLY",
                    open: "2320.50",
                    hb: "2412.80",
                    lb: "2270.00",
                  },
                  {
                    tf: "WEEKLY",
                    open: "2352.00",
                    hb: "2390.00",
                    lb: "2340.10",
                  },
                  {
                    tf: "DAILY",
                    open: "2368.40",
                    hb: "2384.50",
                    lb: "2362.00",
                  },
                  {
                    tf: "H4 GRID",
                    open: "2371.15",
                    hb: "2379.80",
                    lb: "2368.00",
                  },
                  {
                    tf: "H1 GRID",
                    open: "2373.90",
                    hb: "2377.20",
                    lb: "2372.50",
                  },
                ].map((row) => (
                  <tr
                    key={row.tf}
                    className="hover:bg-zinc-900/40 transition-colors group"
                  >
                    <td className="py-2 font-bold text-zinc-300 group-hover:text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-400" />
                      {row.tf}
                    </td>
                    <td className="py-2 text-zinc-400 font-mono">{row.open}</td>
                    <td className="py-2 text-emerald-500/80 font-mono">
                      {row.hb}
                    </td>
                    <td className="py-2 text-rose-500/80 font-mono">
                      {row.lb}
                    </td>
                    <td className="py-2 text-emerald-400 font-semibold">
                      NRL UP
                    </td>
                    <td className="py-2">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">
                        UP VECTOR
                      </span>
                    </td>
                    <td className="py-2 text-right text-amber-400/90 font-medium tracking-wide">
                      TARGET ATAS
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* BLOCK 7: PIVOT ENGINE */}
        <Panel
          title="MATH PIVOT ENGINE"
          className="col-span-12 lg:col-span-3 bg-[#09090b]/80 border-zinc-800/80"
        >
          <div className="space-y-1.5 text-xs font-mono pt-1">
            {[
              {
                label: "R4 QUANT LEVEL",
                value: "2393.17",
                color: "text-zinc-400",
              },
              {
                label: "R3 QUANT LEVEL",
                value: "2386.58",
                color: "text-zinc-400",
              },
              {
                label: "R2 BREAKOUT",
                value: "2381.18",
                color: "text-amber-400",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border-b border-zinc-900 pb-1"
              >
                <span className="text-zinc-500">{item.label}</span>
                <span className={`font-bold ${item.color}`}>{item.value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center bg-emerald-500/5 border border-emerald-500/10 rounded px-2 py-1.5 my-1">
              <span className="text-emerald-400/80 font-bold flex items-center gap-1">
                <Compass className="h-3.5 w-3.5" /> CENTRAL PIVOT
              </span>
              <span className="font-bold text-emerald-400 text-sm">
                2375.89
              </span>
            </div>
            <div className="flex justify-between items-center pt-0.5">
              <span className="text-zinc-500">S1 SUPPORT</span>
              <span className="font-bold text-zinc-400">2370.01</span>
            </div>
          </div>
        </Panel>

        {/* ================= ROW 2 BLOCKS ================= */}

        {/* BLOCK 8: LIQUIDITY ENGINE */}
        <Panel
          title="LIQUIDITY MATRIX"
          className="col-span-12 sm:col-span-6 lg:col-span-3 bg-[#09090b]/80 border-zinc-800/80"
        >
          <div className="space-y-2 text-xs font-mono pt-1">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5">
              <span className="text-zinc-500">EQH TARGET</span>
              <span className="font-bold text-zinc-300">2388.50</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5">
              <span className="text-zinc-500">EQL POOL</span>
              <span className="font-bold text-zinc-300">2342.10</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[10px] bg-emerald-500/5 border border-emerald-500/10 p-1.5 rounded justify-center">
              <AlertCircle className="h-3.5 w-3.5 animate-pulse" /> ENGINE POOL:
              UNTOUCHED
            </div>
          </div>
        </Panel>

        {/* BLOCK 9: MAGNET LIQUIDITY */}
        <Panel
          title="MAGNET LIQUIDITY POOL"
          className="col-span-12 sm:col-span-6 lg:col-span-3 bg-[#09090b]/80 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.03)]"
        >
          <div className="text-center flex flex-col justify-between h-full pt-1">
            <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
              Next Algorithmic Target
            </span>
            <div className="text-4xl font-mono font-black text-emerald-400 tracking-tight my-1 drop-shadow-[0_0_10px_rgba(16,185,129,0.15)]">
              2388.50
            </div>
            <div className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 py-1 rounded tracking-widest uppercase">
              BUY SIDE LIQUIDITY
            </div>
          </div>
        </Panel>

        {/* BLOCK 10: LIQUIDITY SCORE BAR */}
        <Panel
          title="LIQUIDITY DISTRIBUTION VOLUME"
          className="col-span-12 sm:col-span-6 lg:col-span-3 bg-[#09090b]/80 border-zinc-800/80"
        >
          <div className="space-y-3 font-mono pt-1 text-xs">
            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span className="flex items-center gap-1">
                  <Layers className="h-3 w-3 text-emerald-400" /> Upper Volume
                  Block
                </span>
                <span className="font-bold text-emerald-400">82%</span>
              </div>
              <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div className="h-full w-[82%] bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span className="flex items-center gap-1">
                  <Layers className="h-3 w-3 text-rose-400" /> Lower Volume Pool
                </span>
                <span className="font-bold text-rose-400">47%</span>
              </div>
              <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div className="h-full w-[47%] bg-gradient-to-r from-rose-600 to-rose-400" />
              </div>
            </div>
          </div>
        </Panel>

        {/* BLOCK 11: MARKET STRUCTURE */}
        <Panel
          title="MARKET STRUCTURE MATRIX"
          className="col-span-12 sm:col-span-6 lg:col-span-3 bg-[#09090b]/80 border-zinc-800/80"
        >
          <div className="flex flex-col justify-between h-full pt-1">
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-500">HH LEVEL</span>
                <span className="text-zinc-300 font-bold">2370.50</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-500">HL LEVEL</span>
                <span className="text-zinc-300 font-bold">2369.80</span>
              </div>
            </div>
            <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 text-center py-2 rounded-xl">
              <span className="text-xl font-black tracking-widest text-emerald-400">
                BULLISH
              </span>
            </div>
          </div>
        </Panel>

        {/* ================= ROW 3 BLOCKS ================= */}

        {/* BLOCK 12: EXECUTION ENGINE */}
        <Panel
          title="EXECUTION MATRIX SIGNAL"
          className="col-span-12 sm:col-span-6 lg:col-span-3 bg-[#09090b]/80 border-emerald-500/30"
        >
          <div className="text-center pt-1 flex flex-col justify-center h-full">
            <div className="text-4xl font-black tracking-widest text-emerald-400 bg-gradient-to-b from-emerald-400 to-emerald-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              BUY
            </div>
            <div className="mt-2 text-xs font-mono text-zinc-400 bg-zinc-900 py-1.5 px-3 rounded border border-zinc-800 inline-block w-fit mx-auto">
              TRIGGER ZONE:{" "}
              <span className="font-bold text-white">2373.00</span>
            </div>
          </div>
        </Panel>

        {/* BLOCK 13: RISK REWARD */}
        <Panel
          title="RISK REWARD CALCULATION"
          className="col-span-12 sm:col-span-6 lg:col-span-3 bg-[#09090b]/80 border-zinc-800/80"
        >
          <div className="space-y-1.5 text-xs font-mono pt-1">
            <div className="flex justify-between border-b border-zinc-900 pb-1">
              <span className="text-zinc-500">TAKE PROFIT 1</span>
              <span className="text-emerald-400 font-bold">2381.18</span>
            </div>
            <div className="flex justify-between border-b border-zinc-900 pb-1">
              <span className="text-zinc-500">TAKE PROFIT 2</span>
              <span className="text-emerald-400 font-bold">2386.58</span>
            </div>
            <div className="flex justify-between items-center pt-0.5 text-zinc-300">
              <span>PROFIT RATIO</span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
                RR 1:2.58
              </span>
            </div>
          </div>
        </Panel>

        {/* BLOCK 14: PROBABILITY ENGINE */}
        <Panel
          title="ALGO PROBABILITY ENGINE"
          className="col-span-12 sm:col-span-6 lg:col-span-3 bg-[#09090b]/80 border-zinc-800/80"
        >
          <div className="flex items-center gap-4 pt-1 justify-center h-full">
            <div className="text-4xl font-mono font-black text-emerald-400 bg-emerald-500/5 rounded-full p-2 border border-emerald-500/10 w-20 h-20 flex items-center justify-center shadow-inner">
              78%
            </div>
            <div className="font-mono text-xs">
              <span className="text-zinc-500 block">EXECUTION CONFIDENCE</span>
              <span className="text-emerald-400 font-bold tracking-wider text-[11px]">
                HIGH WIN PROBABILITY
              </span>
            </div>
          </div>
        </Panel>

        {/* BLOCK 15: TRADE STATUS */}
        <Panel
          title="SYSTEM OPERATIONS STATUS"
          className="col-span-12 sm:col-span-6 lg:col-span-3 bg-[#09090b]/80 border-zinc-800/80"
        >
          <div className="space-y-1.5 text-xs font-mono pt-1">
            {[
              {
                text: "AWAITING MARKET ENTRY",
                color: "text-amber-400 bg-amber-500/5 border-amber-500/10",
              },
              {
                text: "ALGO MATRIX VALIDATED",
                color:
                  "text-emerald-400 bg-emerald-500/5 border-emerald-500/10",
              },
              {
                text: "VECTOR TARGET ACTIVE",
                color:
                  "text-emerald-400 bg-emerald-500/5 border-emerald-500/10",
              },
            ].map((status, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-2 py-1 rounded border ${status.color}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                <span className="text-[10px] font-bold tracking-wider">
                  {status.text}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        {/* ================= FOOTER BLOCK ================= */}

        {/* BLOCK 16: CONFIDENCE SCORE BAR WIDE */}
        <Panel
          title="AGGREGATED VECTOR CONFIDENCE SCORE"
          className="col-span-12 bg-[#09090b]/90 border-zinc-800/80 shadow-2xl rounded-xl"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-1">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center bg-gradient-to-tr from-emerald-600/20 to-cyan-500/10 rounded-lg p-2.5 border border-emerald-500/20">
                <Gauge className="h-7 w-7 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-widest">
                  Total Weight Rating
                </span>
                <div className="text-4xl font-mono font-black text-emerald-400 tracking-tight">
                  78{" "}
                  <span className="text-zinc-600 text-lg font-light">
                    / 100
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-6 w-full lg:w-auto font-mono text-xs">
              {[
                { name: "Vector Trend", val: "83%" },
                { name: "Pool Liquidity", val: "82%" },
                { name: "Fractal Structure", val: "80%" },
                { name: "Trading Session", val: "67%" },
              ].map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800/80 flex justify-between items-center min-w-[140px]"
                >
                  <span className="text-zinc-500">{metric.name}</span>
                  <span className="font-bold text-white bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                    {metric.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </main>
  );
}
