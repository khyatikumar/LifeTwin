import React, { useState } from "react";
import { AIDecision } from "../types";
import { Brain, Sparkles, MessageSquare, ShieldCheck, Cpu, RefreshCw, BarChart2 } from "lucide-react";

interface DecisionTwinProps {
  decisions: AIDecision[];
  onConsultTwin: (question: string) => Promise<AIDecision>;
}

export default function DecisionTwin({ decisions, onConsultTwin }: DecisionTwinProps) {
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeDecision, setActiveDecision] = useState<AIDecision | null>(null);

  const templates = [
    "Should I accept the relocate offer to Zurich as Project Lead?",
    "Should I acquire the smart-home real estate property in Switzerland?",
    "Is pursuing a PhD in AI Ethics aligned with my long-term CTO ambition?",
    "Should I allocate 15% more budget into high-yield stock index investments?"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || question.trim().length < 5) return;

    setIsSubmitting(true);
    setActiveDecision(null);
    try {
      const decisionResult = await onConsultTwin(question);
      setActiveDecision(decisionResult);
    } catch (err) {
      console.error("Failure consulting digital decision twin:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      
      {/* Consult Interactive Terminal */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-base font-bold text-slate-900 tracking-tight uppercase font-geist flex items-center gap-2">
            <Brain className="h-5 w-5 text-indigo-600" /> Consult Twin Brain Core
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Pose structured decisions. LifeTwin AI references your credentials, financial surpluses, and goals to predict optimal paths.
          </p>
        </div>

        {/* Suggested Templates */}
        <div className="space-y-2">
          <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Suggested Quick-Model Queries</label>
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
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Pose High-Stakes Decision</label>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Should I accept the lateral offer?..."
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
                <RefreshCw className="h-4.5 w-4.5 animate-spin" /> Synthesizing decision matrix...
              </>
            ) : (
              <>
                <Cpu className="h-4.5 w-4.5" /> Initialize Twin Intellect Analysis
              </>
            )}
          </button>
        </form>
      </div>

      {/* Real-time Response Output */}
      {activeDecision && (
        <div className="bg-white text-slate-800 p-6 md:p-8 rounded-2xl border border-indigo-100 shadow-md animate-fade-in space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-full w-[40%] bg-[radial-gradient(circle_at_top_right,#4f46e5_0%,transparent_75%)] pointer-events-none opacity-5"></div>
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="space-y-0.5">
              <span className="text-[9px] font-mono bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded font-semibold border border-indigo-100 uppercase tracking-widest flex items-center gap-1.5 w-fit">
                <Sparkles className="h-3 w-3 animate-pulse" /> Alignment Synthesized
              </span>
              <h4 className="text-sm font-bold text-slate-900 leading-tight font-geist mt-1.5">
                Query: {activeDecision.question}
              </h4>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2 text-center shrink-0">
              <p className="text-[9px] font-mono text-indigo-600 uppercase">Alignment Match</p>
              <h3 className="text-2xl font-geist font-bold text-indigo-700">{activeDecision.confidenceScore}%</h3>
            </div>
          </div>

          {/* Recommendation Block */}
          <div className="space-y-1.5 p-4 bg-indigo-50/50 border border-indigo-100/60 rounded-xl">
            <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">Twin Recommendation</p>
            <p className="text-xs font-semibold text-slate-900 leading-relaxed font-geist">
              {activeDecision.recommendation}
            </p>
          </div>

          {/* Reasoning */}
          <div className="space-y-2">
            <h5 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Strategic Reasoning Matrix</h5>
            <p className="text-xs text-slate-600 leading-relaxed font-sans whitespace-pre-line">
              {activeDecision.reasoning}
            </p>
          </div>

          {/* Footnotes */}
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400 font-mono">
            <ShieldCheck className="h-4 w-4 text-emerald-500" /> Decisive parameters verified against your synced profile, goals, financial data, and timeline constraints.
          </div>
        </div>
      )}

      {/* Decision Log Directory */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h4 className="text-xs font-bold text-slate-900 tracking-tight uppercase font-geist flex items-center gap-1.5 border-b border-slate-100 pb-3">
          <BarChart2 className="h-4 w-4 text-slate-500" /> Historic Alignments Catalog
        </h4>

        <div className="space-y-4">
          {decisions.map((dec) => (
            <div key={dec.id} className="p-4 bg-slate-50 hover:bg-slate-100/50 rounded-xl border border-slate-150 transition-colors space-y-3">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <p className="text-xs font-bold text-slate-800 font-geist">Query: "{dec.question}"</p>
                <div className="flex items-center gap-2 font-mono text-[10px]">
                  <span className="text-slate-400">{dec.date}</span>
                  <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold border border-indigo-100">
                    Confidence: {dec.confidenceScore}%
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed">
                <span className="font-semibold text-indigo-600">Decision:</span> {dec.recommendation}
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed font-sans pl-3 border-l-2 border-slate-200">
                {dec.reasoning}
              </p>
            </div>
          ))}

          {decisions.length === 0 && (
            <p className="text-center p-6 text-slate-400 text-xs font-sans">No decisions synchronized in catalog yet.</p>
          )}
        </div>
      </div>

    </div>
  );
}
