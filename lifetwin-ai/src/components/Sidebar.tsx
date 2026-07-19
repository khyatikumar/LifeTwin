import React from "react";
import { 
  LayoutDashboard, 
  User, 
  Wallet, 
  Target, 
  Activity, 
  Brain, 
  Compass, 
  History, 
  Settings, 
  LogOut,
  Sparkles
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userFullName: string;
  onLogout: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, userFullName, onLogout }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "profile", label: "Personal Profile", icon: User },
    { id: "financial", label: "Money Profile", icon: Wallet },
    { id: "goals", label: "Life Goals", icon: Target },
    { id: "timeline", label: "Life Timeline", icon: Activity },
    { id: "decision", label: "Decision Guide", icon: Brain, badge: "New" },
    { id: "simulation", label: "Career Paths", icon: Compass, badge: "Plan" },
    { id: "history", label: "Decision History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside 
      id="app-sidebar" 
      className="w-64 bg-white border-r border-slate-200/80 flex flex-col text-slate-700 h-screen sticky top-0"
    >
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-geist font-bold text-lg text-slate-900 tracking-tight leading-tight">
            LifeTwin
          </h1>
          <p className="text-[10px] font-mono text-slate-450 tracking-wider uppercase">
            Personal Decision Guide
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "hover:bg-slate-50 hover:text-slate-900 text-slate-600"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-4.5 w-4.5 transition-transform duration-150 group-hover:scale-105 ${
                  isActive ? "text-white" : "text-slate-400 group-hover:text-slate-700"
                }`} />
                <span>{item.label}</span>
              </div>
              
              {item.badge && (
                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                  isActive 
                    ? "bg-indigo-500 text-white" 
                    : item.badge === "New" 
                      ? "bg-indigo-50 text-indigo-600 border border-indigo-100" 
                      : "bg-slate-100 text-slate-500"
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Info / Logout Profile Section */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 border border-slate-100">
          <div className="h-9 w-9 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-sm border border-indigo-100">
            {userFullName ? userFullName.split(" ").map(n => n[0]).join("") : "US"}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xs font-semibold text-slate-800 truncate">
              {userFullName || "Guest User"}
            </h2>
            <p className="text-[10px] text-emerald-600 flex items-center gap-1 font-mono">
              <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse inline-block"></span>
              Planning profile active
            </p>
          </div>
          <button
            onClick={onLogout}
            title="Log Out"
            className="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-slate-100 transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
