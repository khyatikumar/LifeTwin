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
        return "Home Overview";
      case "profile":
        return "Personal Profile";
      case "financial":
        return "Money Profile";
      case "goals":
        return "Life Goals";
      case "timeline":
        return "Life Timeline";
      case "decision":
        return "Decision Guide";
      case "simulation":
        return "Career Path Explorer";
      case "history":
        return "Decision History";
      case "settings":
        return "Account Settings";
      default:
        return "Dashboard";
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "A simple view of your profile, priorities, choices, and progress.";
      case "profile":
        return "Manage your personal details, education, career, and goals.";
      case "financial":
        return "Track income, expenses, savings, investments, loans, and safety funds.";
      case "goals":
        return "Set important goals and follow your progress toward them.";
      case "timeline":
        return "Keep important personal, career, and financial moments in one place.";
      case "decision":
        return "Ask important questions and compare choices against your life goals.";
      case "simulation":
        return "Compare possible career paths, income changes, and next steps.";
      case "history":
        return "Review your previous questions, answers, and career path notes.";
      case "settings":
        return "Manage notifications, privacy, and account preferences.";
      default:
        return "LifeTwin planning workspace";
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
              <Sparkles className="h-3 w-3 animate-spin" /> Personal Guide
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
              <span className="font-mono text-indigo-600">Saving changes...</span>
            </>
          ) : (
            <>
              <CloudCheck className="h-4 w-4 text-emerald-500" />
              <span className="font-mono text-slate-500">All changes saved</span>
            </>
          )}
        </div>

        {/* Hello Welcome Back */}
        <div className="text-right hidden sm:block">
          <p className="text-xs font-medium text-slate-800">
            {userFullName || "Alex Sterling"}
          </p>
          <p className="text-[10px] text-slate-400 font-mono">
            LifeTwin member
          </p>
        </div>
      </div>
    </header>
  );
}
