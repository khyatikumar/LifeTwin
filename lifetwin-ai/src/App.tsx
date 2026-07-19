import React, { useState, useEffect } from "react";
import { AppState, UserProfile, FinancialProfile, Goal, TimelineEvent, AIDecision, SimulationResult, UserSettings, GoalStatus } from "./types";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import ProfileForm from "./components/ProfileForm";
import FinancialForm from "./components/FinancialForm";
import GoalsList from "./components/GoalsList";
import TimelineEvents from "./components/TimelineEvents";
import DecisionTwin from "./components/DecisionTwin";
import CareerSimulation from "./components/CareerSimulation";
import SettingsPanel from "./components/SettingsPanel";
import { Loader2 } from "lucide-react";
import { ApiError } from "./services/apiClient";
import { dashboardService } from "./services/dashboardService";
import { profileService } from "./services/profileService";
import { financialService } from "./services/financialService";
import { goalService } from "./services/goalService";
import { timelineService } from "./services/timelineService";
import { decisionService } from "./services/decisionService";
import { simulationService } from "./services/simulationService";
import { clearSession, getStoredEmail, getStoredFullName, getToken, saveSession } from "./services/tokenStorage";
import { saveSettings } from "./services/mappers";

export default function App() {
  const [token, setToken] = useState<string | null>(getToken());
  const [email, setEmail] = useState<string | null>(getStoredEmail());
  const [fullName, setFullName] = useState<string | null>(getStoredFullName());
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [state, setState] = useState<AppState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("lifetwin_theme") === "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
    localStorage.setItem("lifetwin_theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Load Dashboard State
  const loadDashboard = async () => {
    setIsLoading(true);
    setError("");
    try {
      const dashboard = await dashboardService.getDashboard();
      setState(dashboard);
      setFullName(dashboard.profile.fullName || getStoredFullName());
    } catch (err) {
      console.error("Failed to load digital twin state:", err);
      setError(err instanceof Error ? err.message : "Could not load dashboard data.");
      if (err instanceof ApiError && err.status === 401) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadDashboard();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const handleLoginSuccess = (newToken: string, newEmail: string, newFullName: string) => {
    saveSession(newToken, newEmail, newFullName);
    setToken(newToken);
    setEmail(newEmail);
    setFullName(newFullName);
  };

  const handleLogout = () => {
    clearSession();
    setToken(null);
    setEmail(null);
    setFullName(null);
    setState(null);
    setActiveTab("dashboard");
  };

  // Profile Update API
 const handleUpdateProfile = async (updatedProfile: UserProfile) => {
  setIsSaving(true);
  setError("");

  try {
    let savedProfile: UserProfile;

    try {
      // Try updating an existing profile
      savedProfile = await profileService.updateProfile(updatedProfile);
    } catch (err) {
      // If the profile doesn't exist, create it instead
      if (
        err instanceof ApiError &&
        (err.status === 400 || err.status === 404)
      ) {
        console.log("Profile not found. Creating a new profile...");

        savedProfile = await profileService.createProfile(updatedProfile);
      } else {
        throw err;
      }
    }

    setState((prev) =>
      prev
        ? {
            ...prev,
            profile: savedProfile,
          }
        : null
    );

    setFullName(savedProfile.fullName || "");

    console.log("Profile saved successfully.");
  } catch (err) {
    console.error("Profile sync API failure:", err);

    setError(
      err instanceof Error
        ? err.message
        : "Could not save profile."
    );

    throw err;
  } finally {
    setIsSaving(false);
  }
};

  // Financial Update API
  const handleUpdateFinancial = async (updatedFinancial: FinancialProfile) => {
  setIsSaving(true);
  setError("");

  try {
    let savedFinancial: FinancialProfile;

    try {
      savedFinancial = await financialService.updateFinancialProfile(updatedFinancial);
    } catch (err) {
      if (
        err instanceof ApiError &&
        (err.status === 400 || err.status === 404)
      ) {
        savedFinancial = await financialService.createFinancialProfile(updatedFinancial);
      } else {
        throw err;
      }
    }

    setState((prev) =>
      prev
        ? {
            ...prev,
            financial: savedFinancial,
          }
        : null
    );
  } catch (err) {
    console.error("Financial sync API failure:", err);
    setError(err instanceof Error ? err.message : "Could not save financial profile.");
    throw err;
  } finally {
    setIsSaving(false);
  }
};

  // Goals API Operations
  const handleAddGoal = async (newGoalData: Partial<Goal>) => {
    setIsSaving(true);
    setError("");
    try {
      const goal = await goalService.createGoal(newGoalData);
      setState(prev => prev ? { ...prev, goals: [...prev.goals, goal] } : null);
    } catch (err) {
      console.error("Goal registration failure:", err);
      setError(err instanceof Error ? err.message : "Could not create goal.");
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteGoal = async (id: string) => {
    setIsSaving(true);
    setError("");
    try {
      await goalService.deleteGoal(id);
      setState(prev => prev ? { ...prev, goals: prev.goals.filter(g => g.id !== id) } : null);
    } catch (err) {
      console.error("Goal removal failure:", err);
      setError(err instanceof Error ? err.message : "Could not delete goal.");
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateGoalStatus = async (id: string, status: GoalStatus) => {
    setIsSaving(true);
    setError("");
    try {
      const currentGoal = state?.goals.find(g => g.id === id);
      if (currentGoal) {
        await goalService.updateGoal({ ...currentGoal, status });
      }
      setState(prev => prev ? {
        ...prev,
        goals: prev.goals.map(g => g.id === id ? { ...g, status } : g)
      } : null);
    } catch (err) {
      console.error("Goal state update failure:", err);
      setError(err instanceof Error ? err.message : "Could not update goal.");
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  // Timeline API Operations
  const handleAddEvent = async (newEventData: Partial<TimelineEvent>) => {
    setIsSaving(true);
    setError("");
    try {
      const event = await timelineService.createEvent(newEventData);
      setState(prev => prev ? { ...prev, timeline: [event, ...prev.timeline].sort((a, b) => b.eventDate.localeCompare(a.eventDate)) } : null);
    } catch (err) {
      console.error("Timeline appending failure:", err);
      setError(err instanceof Error ? err.message : "Could not create timeline event.");
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateEvent = async (updatedEvent: TimelineEvent) => {
    setIsSaving(true);
    setError("");
    try {
      const event = await timelineService.updateEvent(updatedEvent);
      setState(prev => prev ? {
        ...prev,
        timeline: prev.timeline.map(item => item.id === event.id ? event : item).sort((a, b) => b.eventDate.localeCompare(a.eventDate))
      } : null);
    } catch (err) {
      console.error("Timeline event update failure:", err);
      setError(err instanceof Error ? err.message : "Could not update timeline event.");
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    setIsSaving(true);
    setError("");
    try {
      await timelineService.deleteEvent(id);
      setState(prev => prev ? { ...prev, timeline: prev.timeline.filter(e => e.id !== id) } : null);
    } catch (err) {
      console.error("Timeline event removal failure:", err);
      setError(err instanceof Error ? err.message : "Could not delete timeline event.");
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  // AI Twin Decisive API
  const handleConsultTwin = async (question: string) => {
    setError("");
    const decision = await decisionService.makeDecision(question);
    setState(prev => prev ? { ...prev, decisions: [decision, ...prev.decisions] } : null);
    return decision;
  };

  // Scenario Simulation API
  const handleRunSimulation = async (question: string) => {
    setError("");
    const simulation = await simulationService.runSimulation(question);
    setState(prev => prev ? { ...prev, simulations: [simulation, ...prev.simulations] } : null);
    return simulation;
  };

  // Settings API
  const handleUpdateSettings = async (updatedSettings: UserSettings) => {
    setIsSaving(true);
    try {
      saveSettings(updatedSettings);
      setState(prev => prev ? { ...prev, settings: updatedSettings } : null);
    } catch (err) {
      console.error("Settings sync failure:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Unauthenticated Route Handler
  if (!token) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }

  // Loading Splash View
  if (isLoading || !state) {
    return (
      <div className="h-screen w-screen bg-white flex flex-col items-center justify-center text-slate-500 gap-4 font-sans select-none">
        <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-slate-900 font-geist">Preparing LifeTwin</p>
          <p className="text-xs text-slate-400">{error || "Loading your saved planning profile..."}</p>
        </div>
      </div>
    );
  }

  // Active Component Switch
  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard state={state} setActiveTab={setActiveTab} />;
      case "profile":
        return <ProfileForm profile={state.profile} onUpdateProfile={handleUpdateProfile} />;
      case "financial":
        return <FinancialForm financial={state.financial} onUpdateFinancial={handleUpdateFinancial} />;
      case "goals":
        return (
          <GoalsList
            goals={state.goals}
            onAddGoal={handleAddGoal}
            onDeleteGoal={handleDeleteGoal}
            onUpdateGoalStatus={handleUpdateGoalStatus}
          />
        );
      case "timeline":
        return (
          <TimelineEvents
            timeline={state.timeline}
            onAddEvent={handleAddEvent}
            onUpdateEvent={handleUpdateEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        );
      case "decision":
        return <DecisionTwin decisions={state.decisions} onConsultTwin={handleConsultTwin} />;
      case "simulation":
        return <CareerSimulation simulations={state.simulations} onRunSimulation={handleRunSimulation} />;
      case "history":
        return (
          <div className="space-y-6 max-w-4xl animate-fade-in bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 tracking-tight uppercase font-geist">
                Decision History
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Review past decisions, career path notes, and the advice you saved.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">Decisions Processed</h4>
              {state.decisions.map((dec) => (
                <div key={dec.id} className="p-4 bg-slate-50 rounded-xl border border-slate-150 text-xs text-slate-700 leading-relaxed space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>"{dec.question}"</span>
                    <span className="text-indigo-600 font-mono">{dec.confidenceScore}% alignment</span>
                  </div>
                  <p><span className="font-semibold text-indigo-600">Decision:</span> {dec.recommendation}</p>
                </div>
              ))}
              {state.decisions.length === 0 && <p className="text-xs text-slate-400 font-sans">No decisions saved yet.</p>}

              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono mt-8">Career Path Reviews</h4>
              {state.simulations.map((sim) => (
                <div key={sim.id} className="p-4 bg-slate-50 rounded-xl border border-slate-150 text-xs text-slate-700 leading-relaxed space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>"{sim.question}"</span>
                    <span className="text-emerald-600 font-mono">+${sim.difference.toLocaleString()}/yr</span>
                  </div>
                  <p><span className="font-semibold text-slate-800">Advice:</span> {sim.recommendation}</p>
                </div>
              ))}
              {state.simulations.length === 0 && <p className="text-xs text-slate-400 font-sans">No career paths saved yet.</p>}
            </div>
          </div>
        );
      case "settings":
        return <SettingsPanel settings={state.settings} onUpdateSettings={handleUpdateSettings} />;
      default:
        return <Dashboard state={state} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-800 font-sans">
      
      {/* Persistent Sidebar Rail */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userFullName={fullName || "Guest User"} 
        onLogout={handleLogout}
      />

      {/* Main Panel Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <Navbar 
          activeTab={activeTab} 
          userFullName={fullName || "Guest User"} 
          isSaving={isSaving}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(value => !value)}
        />

        {/* Modular View Body Container */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {error && (
            <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">
              {error}
            </div>
          )}
          {renderActiveTab()}
        </main>

      </div>

    </div>
  );
}
