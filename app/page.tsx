import { Panel } from "@/components/terminal/panel";
import { GaugeMeter } from "@/components/terminal/gauge-meter";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black p-2 text-white">
      <div className="grid grid-cols-12 gap-[2px]">
        {/* HEADER */}

        <Panel title="XAUUSD" className="col-span-2">
          <div className="space-y-2">
            <p className="text-4xl font-bold text-green-500">2375.42</p>

            <p className="text-green-400">+12.36 (+0.52%)</p>
          </div>
        </Panel>

        <Panel title="Running Price" className="col-span-2">
          <div className="text-center">
            <div className="text-3xl text-green-500 font-bold">2375.42</div>
          </div>
        </Panel>

        <Panel title="Gann Root" className="col-span-2">
          <div className="text-center">
            <div className="text-3xl text-green-400">48.73</div>
          </div>
        </Panel>

        <Panel title="Gann Degree" className="col-span-2">
          <div className="text-center">
            <div className="text-3xl text-green-400">8771.40</div>
          </div>
        </Panel>

        <Panel title="Market Story Engine" className="col-span-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Trend Dominan</span>
              <span className="text-green-500">NRL UP</span>
            </div>

            <div className="flex justify-between">
              <span>Target</span>
              <span className="text-yellow-400">Atas</span>
            </div>

            <div className="text-center text-2xl text-green-500 font-bold">
              BUY AREA
            </div>
          </div>
        </Panel>

        {/* MATRIX */}

        <Panel title="Trend Matrix" className="col-span-9">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-700 text-yellow-400">
                <th className="p-1">TF</th>
                <th>OPEN</th>
                <th>HB</th>
                <th>LB</th>
                <th>TREND</th>
                <th>MOVE</th>
                <th>TUGAS</th>
              </tr>
            </thead>

            <tbody>
              {["YEAR", "MONTH", "WEEK", "DAY", "H4", "H1"].map((tf) => (
                <tr key={tf} className="border-b border-zinc-800">
                  <td className="p-1">{tf}</td>

                  <td>2375</td>
                  <td>2381</td>
                  <td>2360</td>

                  <td className="text-green-500">NRL UP</td>

                  <td className="text-green-500">UP</td>

                  <td className="text-yellow-400">TARGET ATAS</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title="Pivot Engine" className="col-span-3">
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>R4</span>
              <span>2393.17</span>
            </div>

            <div className="flex justify-between">
              <span>R3</span>
              <span>2386.58</span>
            </div>

            <div className="flex justify-between">
              <span>R2</span>
              <span className="text-yellow-400">2381.18</span>
            </div>

            <div className="flex justify-between">
              <span>PIVOT</span>
              <span className="text-green-500">2375.89</span>
            </div>

            <div className="flex justify-between">
              <span>S1</span>
              <span>2370.01</span>
            </div>
          </div>
        </Panel>

        {/* ROW 2 */}

        <Panel title="Liquidity Engine" className="col-span-3">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>EQH</span>
              <span>2388.50</span>
            </div>

            <div className="flex justify-between">
              <span>EQL</span>
              <span>2342.10</span>
            </div>

            <div className="text-green-500">BELUM DISENTUH</div>
          </div>
        </Panel>

        <Panel title="Magnet Liquidity" className="col-span-3">
          <div className="text-center">
            <div className="text-sm">Target Berikutnya</div>

            <div className="text-5xl font-bold text-green-500">2388.50</div>

            <div className="mt-2 text-green-400">LIKUIDITAS BELI</div>
          </div>
        </Panel>

        <Panel title="Skor Likuiditas" className="col-span-3">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between">
                <span>Atas</span>
                <span>82</span>
              </div>

              <div className="h-3 bg-zinc-800">
                <div className="h-3 w-[82%] bg-green-500" />
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span>Bawah</span>
                <span>47</span>
              </div>

              <div className="h-3 bg-zinc-800">
                <div className="h-3 w-[47%] bg-red-500" />
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Market Structure" className="col-span-3">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>HH</span>
              <span>2370.50</span>
            </div>

            <div className="flex justify-between">
              <span>HL</span>
              <span>2369.80</span>
            </div>

            <div className="text-center text-green-500 font-bold text-xl">
              BULLISH
            </div>
          </div>
        </Panel>

        {/* ROW 3 */}

        <Panel title="Execution Engine" className="col-span-3">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-500">BUY</div>

            <div className="mt-3">Area 2373.00</div>
          </div>
        </Panel>

        <Panel title="Risk Reward" className="col-span-3">
          <div className="space-y-2">
            <div>TP1 2381.18</div>
            <div>TP2 2386.58</div>
            <div>RR 1:2.58</div>
          </div>
        </Panel>

        <Panel title="Probability Engine" className="col-span-3">
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold text-green-500">78%</div>

            <div className="text-sm">BUY PROBABILITY</div>
          </div>
        </Panel>

        <Panel title="Trade Status" className="col-span-3">
          <div className="space-y-2 text-sm">
            <div className="text-yellow-400">● MENUNGGU ENTRY</div>

            <div className="text-green-500">● SETUP VALID</div>

            <div className="text-green-500">● TARGET AKTIF</div>
          </div>
        </Panel>

        {/* FOOTER */}

        <Panel title="Confidence Score" className="col-span-12">
          <div className="flex items-center justify-between">
            <div className="text-6xl font-bold text-green-500">78 / 100</div>

            <div className="grid grid-cols-4 gap-6 text-sm">
              <div>Trend 83%</div>
              <div>Liquidity 82%</div>
              <div>Structure 80%</div>
              <div>Session 67%</div>
            </div>
          </div>
        </Panel>
      </div>
    </main>
  );
}
