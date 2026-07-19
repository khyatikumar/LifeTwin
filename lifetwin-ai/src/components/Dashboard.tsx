import React from "react";
import { AppState } from "../types";
import { 
  TrendingUp, 
  Target, 
  Brain, 
  Clock, 
  Sparkles, 
  DollarSign, 
  ArrowUpRight, 
  Percent, 
  Briefcase, 
  MapPin, 
  ShieldCheck,
  Calendar
} from "lucide-react";

interface DashboardProps {
  state: AppState;
  setActiveTab: (tab: string) => void;
}

export default function Dashboard({ state, setActiveTab }: DashboardProps) {
  const { profile, financial, goals, timeline, decisions, simulations } = state;

  // Calculate high-fidelity aggregates
  const totalNetWorth = financial.currentSavings + financial.currentInvestments;
  const savingsRate = financial.monthlyIncome > 0 ? Math.round(((financial.monthlyIncome - financial.monthlyExpenses) / financial.monthlyIncome) * 100) : 0;
  const activeGoalsCount = goals.filter(g => g.status === 'Active' || g.status === 'Simulating').length;
  const primaryGoal = goals[0]?.name || profile.careerGoal || "your next priority";

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Dynamic Digital Twin Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/40 text-slate-900 relative overflow-hidden shadow-sm border border-indigo-100">
        <div className="absolute top-0 right-0 h-full w-[40%] bg-[radial-gradient(ellipse_at_top_right,#4f46e5_0%,transparent_70%)] pointer-events-none opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-100/50 text-indigo-700 text-[10px] font-mono rounded-full border border-indigo-200/50">
              <Sparkles className="h-3 w-3" /> Life Plan Status: Ready
            </div>
            <h1 className="text-2xl md:text-3xl font-geist font-bold tracking-tight text-slate-900">
              Hello, {profile.fullName || "Alex Sterling"}
            </h1>
            <p className="text-slate-600 text-xs md:text-sm max-w-2xl font-sans">
              Your profile, money picture, goals, timeline, and decision history are ready.
              Focus area: <span className="text-indigo-600 font-semibold">{primaryGoal}</span>.
            </p>
          </div>
          
          <button
            onClick={() => setActiveTab("decision")}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition-all self-start md:self-center shadow-lg shadow-indigo-600/15 cursor-pointer hover:scale-102 flex items-center gap-2"
          >
            <Brain className="h-4 w-4" /> Ask Decision Guide
          </button>
        </div>
      </div>

      {/* Bento Grid Aggregates Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Net Worth */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">Net Worth</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-geist font-bold text-slate-900">
              ${totalNetWorth.toLocaleString()}
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Liabilities: <span className="font-semibold text-slate-600">{financial.outstandingLoans}</span>
            </p>
          </div>
        </div>

        {/* Card 2: Savings Efficiency */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">Savings Rate</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Percent className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-geist font-bold text-slate-900">
              {savingsRate}%
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Cash flow surplus: <span className="font-semibold text-emerald-600">+${(financial.monthlyIncome - financial.monthlyExpenses).toLocaleString()}/mo</span>
            </p>
          </div>
        </div>

        {/* Card 3: Strategic Goals */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">Active Goals</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Target className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-geist font-bold text-slate-900">
              {activeGoalsCount} / {goals.length}
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Goals currently in progress
            </p>
          </div>
        </div>

        {/* Card 4: Twin Confidence index */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-sans">Plans Reviewed</span>
            <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-geist font-bold text-slate-900">
              {simulations.length + decisions.length}
            </h3>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Choices and paths reviewed
            </p>
          </div>
        </div>
      </div>

      {/* Main 2-Column Dashboard Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Recent AI Decision & Simulations (Spans 7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Recent AI Decisions Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="space-y-0.5">
                <h3 className="font-geist font-bold text-slate-900 text-sm tracking-tight uppercase flex items-center gap-1.5">
                  <Brain className="h-4.5 w-4.5 text-indigo-600" /> Recent Decision Recommendation
                </h3>
                <p className="text-xs text-slate-500">The latest recommendation based on your goals and profile.</p>
              </div>
              <button 
                onClick={() => setActiveTab("decision")}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                All Decisions <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {decisions && decisions.length > 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-semibold border border-indigo-100/60">
                    Question: {decisions[0].question}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-400 font-mono">{decisions[0].date}</span>
                    <span className="text-xs bg-indigo-600 text-white font-semibold font-mono px-2 py-0.5 rounded">
                      Align: {decisions[0].confidenceScore}%
                    </span>
                  </div>
                </div>
                
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  <span className="text-indigo-600 font-bold">Recommendation:</span> {decisions[0].recommendation}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed font-sans border-t border-slate-200/50 pt-2">
                  {decisions[0].reasoning}
                </p>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs font-sans">
                No decisions reviewed yet. Open the Decision Guide to get started.
              </div>
            )}
          </div>

          {/* Recent Simulations Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="space-y-0.5">
                <h3 className="font-geist font-bold text-slate-900 text-sm tracking-tight uppercase flex items-center gap-1.5">
                  <TrendingUp className="h-4.5 w-4.5 text-pink-600" /> Recent Career Path
                </h3>
                <p className="text-xs text-slate-500">Compare possible career outcomes and money changes.</p>
              </div>
              <button 
                onClick={() => setActiveTab("simulation")}
                className="text-xs font-semibold text-pink-600 hover:text-pink-800 flex items-center gap-1"
              >
                Explore Path <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {simulations && simulations.length > 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-slate-700">
                    {simulations[0].question}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{simulations[0].date}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 p-3 bg-white rounded-lg border border-slate-100">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Current Salary</p>
                    <p className="text-xs font-semibold text-slate-700">${simulations[0].currentSalary.toLocaleString()}/yr</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Income Change</p>
                    <p className="text-xs font-bold text-emerald-600">+${simulations[0].difference.toLocaleString()}/yr</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Possible Salary</p>
                    <p className="text-xs font-semibold text-indigo-600">${simulations[0].simulatedSalary.toLocaleString()}/yr</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  <span className="font-semibold text-slate-700">Career Advice:</span> {simulations[0].recommendation}
                </p>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs font-sans">
                No career paths explored yet. Open Career Paths to compare options.
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Strategic Ambitions & Timeline (Spans 5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Strategic Ambitions (Goals Snapshot) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-geist font-bold text-slate-900 text-sm tracking-tight uppercase flex items-center gap-1.5">
                <Target className="h-4.5 w-4.5 text-indigo-600" /> Goal Status
              </h3>
              <button 
                onClick={() => setActiveTab("goals")}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Manage
              </button>
            </div>

            <div className="space-y-3">
              {goals.slice(0, 3).map((goal) => (
                <div key={goal.id} className="p-3 bg-slate-50 hover:bg-slate-100/50 rounded-xl border border-slate-100/80 transition-colors flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-800 truncate">{goal.name}</h4>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        goal.priority === 'HIGH' 
                          ? 'bg-red-50 text-red-600 border border-red-100' 
                          : goal.priority === 'MED' 
                            ? 'bg-amber-50 text-amber-600 border border-amber-100' 
                            : 'bg-slate-100 text-slate-600'
                      }`}>
                        {goal.priority}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{goal.description}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono bg-indigo-50 text-indigo-600 border border-indigo-100 font-bold px-2 py-0.5 rounded">
                      {goal.probability || "Analyzing"}
                    </span>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">Year {goal.targetYear}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Timeline Feed Snapshot */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-geist font-bold text-slate-900 text-sm tracking-tight uppercase flex items-center gap-1.5">
                <Clock className="h-4.5 w-4.5 text-slate-600" /> Life Timeline
              </h3>
              <button 
                onClick={() => setActiveTab("timeline")}
                className="text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                View Timeline
              </button>
            </div>

            <div className="relative border-l border-slate-100 pl-4 space-y-4 ml-2">
              {timeline.slice(0, 3).map((event) => (
                <div key={event.id} className="relative space-y-1">
                  {/* Timeline bullet */}
                  <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-slate-300 border-2 border-white ring-4 ring-slate-50"></span>
                  
                  <div className="flex justify-between items-baseline gap-2">
                    <h4 className="text-xs font-bold text-slate-800">{event.title}</h4>
                    <span className="text-[9px] text-slate-400 font-mono shrink-0">{event.eventDate}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 line-clamp-1">{event.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
