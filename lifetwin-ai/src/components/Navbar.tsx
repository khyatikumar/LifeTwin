import React from "react";
import { Sparkles, CloudCheck, RefreshCw, Moon, Sun } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  userFullName: string;
  isSaving?: boolean;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export default function Navbar({ activeTab, userFullName, isSaving = false, isDarkMode = false, onToggleTheme }: NavbarProps) {
  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Command Center";
      case "profile":
        return "Digital Identity Vector";
      case "financial":
        return "Financial Architecture";
      case "goals":
        return "Strategic Ambitions";
      case "timeline":
        return "Chronological Life Vector";
      case "decision":
        return "AI Decision Laboratory";
      case "simulation":
        return "Future Scenario Simulator";
      case "history":
        return "Historic Decisions Log";
      case "settings":
        return "Core Configuration";
      default:
        return "Dashboard";
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Bento aggregate of your simulated life, active priorities, and twin health.";
      case "profile":
        return "Manage your demographic, career credentials, and professional telemetry.";
      case "financial":
        return "Configure your cash flows, asset allocations, liabilities, and safety nets.";
      case "goals":
        return "Establish milestones and calculate real-time AI probability matching.";
      case "timeline":
        return "Real-time sync of personal milestones, financial entries, and updates.";
      case "decision":
        return "Ask high-stakes questions to obtain custom alignment scores and strategic paths.";
      case "simulation":
        return "Model structural decisions to compare future income deltas and recommendations.";
      case "history":
        return "Audit previous decisions, twin alignments, and generated pathways.";
      case "settings":
        return "Manage secure keys, data protocols, and privacy mode constraints.";
      default:
        return "Digital Decision Twin Sandbox";
    }
  };

  return (
    <header 
      id="app-navbar" 
      className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10"
    >
      <div className="flex flex-col">
        <h2 className="font-geist font-bold text-slate-900 tracking-tight text-sm leading-tight uppercase flex items-center gap-1.5">
          {getPageTitle()}
          {activeTab === "decision" && (
            <span className="flex items-center gap-1 text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-mono border border-indigo-100">
              <Sparkles className="h-3 w-3 animate-spin" /> Custom Model
            </span>
          )}
        </h2>
        <p className="text-xs text-slate-500 font-sans mt-0.5">
          {getPageSubtitle()}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleTheme}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="h-9 w-9 rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-white transition-all flex items-center justify-center"
        >
          {isDarkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
        </button>

        {/* Sync Status Badge */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full text-xs text-slate-600">
          {isSaving ? (
            <>
              <RefreshCw className="h-3 w-3 text-indigo-600 animate-spin" />
              <span className="font-mono text-indigo-600">Syncing changes...</span>
            </>
          ) : (
            <>
              <CloudCheck className="h-4 w-4 text-emerald-500" />
              <span className="font-mono text-slate-500">Synced to Cloud</span>
            </>
          )}
        </div>

        {/* Hello Welcome Back */}
        <div className="text-right hidden sm:block">
          <p className="text-xs font-medium text-slate-800">
            {userFullName || "Alex Sterling"}
          </p>
          <p className="text-[10px] text-slate-400 font-mono">
            Model: gemini-3.5-flash
          </p>
        </div>
      </div>
    </header>
  );
}
