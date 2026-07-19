import React, { useState } from "react";
import { SimulationResult } from "../types";
import { Compass, Sparkles, AlertCircle, RefreshCw, BarChart, TrendingUp, HelpCircle } from "lucide-react";

interface CareerSimulationProps {
  simulations: SimulationResult[];
  onRunSimulation: (question: string) => Promise<SimulationResult>;
}

export default function CareerSimulation({ simulations, onRunSimulation }: CareerSimulationProps) {
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSim, setActiveSim] = useState<SimulationResult | null>(null);

  const templates = [
    "Project Lead position in Zurich vs. Team Lead role in Austin",
    "Head of Product at a growing company vs. Director of Strategy",
    "Independent Consultant route vs. Staying full-time Director"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || question.trim().length < 5) return;

    setIsSubmitting(true);
    setActiveSim(null);
    try {
      const result = await onRunSimulation(question);
      setActiveSim(result);
    } catch (err) {
      console.error("Simulation run error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      
      {/* Simulation Configuration Control */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900 tracking-tight uppercase font-geist flex items-center gap-2">
            <Compass className="h-5 w-5 text-indigo-600" /> Career Path Explorer
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Compare career options, possible income changes, and long-term fit.
          </p>
        </div>

        {/* Templates */}
        <div className="space-y-2">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Suggested Career Paths</label>
          <div className="flex flex-wrap gap-2">
            {templates.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setQuestion(t)}
                className="text-[11px] text-slate-600 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 px-3 py-1.5 rounded-lg border border-slate-150 transition-all text-left cursor-pointer"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Describe Career Path or Move</label>
            <div className="relative">
              <Compass className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. Zurich Project Lead with 225k annual pay..."
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !question.trim()}
            className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-all hover:shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="h-4.5 w-4.5 animate-spin" /> Comparing career paths...
              </>
            ) : (
              <>
                <Sparkles className="h-4.5 w-4.5" /> Compare Career Path
              </>
            )}
          </button>
        </form>
      </div>

      {/* Dynamic Simulation Result Graphics */}
      {activeSim && (
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-md animate-fade-in space-y-6">
          <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
            <div>
              <span className="text-[9px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold border border-emerald-100 uppercase">
                Career Path Reviewed
              </span>
              <h4 className="text-sm font-bold text-slate-900 leading-tight font-geist mt-1">
                {activeSim.question}
              </h4>
            </div>
            <span className="text-xs text-slate-400 font-mono">{activeSim.date}</span>
          </div>

          {/* Visualizing Compensation Deltas */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Annual Income Comparison</h5>
            
            <div className="space-y-3.5">
              {/* Baseline */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500 font-sans font-medium">Current Role</span>
                  <span className="text-slate-800 font-bold">${activeSim.currentSalary.toLocaleString()}/yr</span>
                </div>
                <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden flex items-center">
                  <div className="h-full bg-slate-400 rounded-full animate-fade-in" style={{ width: "70%" }}></div>
                </div>
              </div>

              {/* Simulated */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-indigo-600 font-sans font-bold">Possible Path</span>
                  <span className="text-indigo-600 font-bold">${activeSim.simulatedSalary.toLocaleString()}/yr</span>
                </div>
                <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden flex items-center">
                  <div className="h-full bg-indigo-600 rounded-full animate-fade-in relative flex items-center justify-end px-3" style={{ width: "85%" }}>
                    <span className="text-[9px] text-white font-bold font-mono">
                      +${activeSim.difference.toLocaleString()}/yr
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Simulation recommendation text */}
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-1">
            <h5 className="text-[10px] font-semibold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5 font-geist">
              <TrendingUp className="h-4 w-4" /> Career Path Advice
            </h5>
            <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
              {activeSim.recommendation}
            </p>
          </div>
        </div>
      )}

      {/* Directory of past simulations */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h4 className="text-xs font-bold text-slate-900 tracking-tight uppercase font-geist flex items-center gap-1.5 border-b border-slate-100 pb-3">
          <BarChart className="h-4 w-4 text-slate-500" /> Saved Career Paths
        </h4>

        <div className="space-y-4">
          {simulations.map((sim) => (
            <div key={sim.id} className="p-4 bg-slate-50 hover:bg-slate-100/50 rounded-xl border border-slate-150 transition-colors space-y-3">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <p className="text-xs font-bold text-slate-800 font-geist">"{sim.question}"</p>
                <div className="flex items-center gap-2 font-mono text-[10px]">
                  <span className="text-slate-400">{sim.date}</span>
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-100">
                    Delta: +${sim.difference.toLocaleString()}/yr
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono p-2 bg-white rounded-lg border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 font-sans block">Current Salary</span>
                  <span className="font-semibold text-slate-700">${sim.currentSalary.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-sans block">Possible Salary</span>
                  <span className="font-semibold text-indigo-600">${sim.simulatedSalary.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                <span className="font-semibold text-slate-800">Career recommendation:</span> {sim.recommendation}
              </p>
            </div>
          ))}

          {simulations.length === 0 && (
            <p className="text-center p-6 text-slate-400 text-xs font-sans">No career paths saved yet.</p>
          )}
        </div>
      </div>

    </div>
  );
}
