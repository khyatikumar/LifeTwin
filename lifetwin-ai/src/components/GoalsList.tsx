import React, { useState } from "react";
import { Goal, GoalPriority, GoalStatus } from "../types";
import { Plus, Target, Trash2, Calendar, MapPin, DollarSign, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

interface GoalsListProps {
  goals: Goal[];
  onAddGoal: (newGoal: Partial<Goal>) => Promise<void>;
  onDeleteGoal: (id: string) => Promise<void>;
  onUpdateGoalStatus: (id: string, status: GoalStatus) => Promise<void>;
}

export default function GoalsList({ goals, onAddGoal, onDeleteGoal, onUpdateGoalStatus }: GoalsListProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("Career");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<GoalPriority>("MED");
  const [targetIncome, setTargetIncome] = useState("");
  const [targetCountry, setTargetCountry] = useState("United States");
  const [targetYear, setTargetYear] = useState(new Date().getFullYear() + 5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      // Calculate a simple readiness label based on priority.
      const mockProb = priority === 'HIGH' ? "78% Align" : priority === 'MED' ? "88% Match" : "94% Match";
      await onAddGoal({
        name,
        type,
        description,
        priority,
        targetIncome: Number(targetIncome) || 0,
        targetCountry,
        targetYear: Number(targetYear),
        status: "Active",
        probability: mockProb
      });

      // Reset
      setName("");
      setDescription("");
      setTargetIncome("");
      setPriority("MED");
      setShowAddForm(false);
    } catch (err) {
      console.error("Failed to append strategic goal:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const types = ["Career", "Financial", "Educational", "Personal", "Health", "Asset Purchase"];
  const countries = ["United States", "Switzerland", "United Kingdom", "Germany", "Singapore", "Canada", "Global", "Multiple (SEA)"];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* View Header with Add Toggle */}
      <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-tight uppercase font-geist">
            Life Goals Tracker
          </h3>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Add important goals and track how ready you are to reach them.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`px-4 py-2 text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
            showAddForm 
              ? "bg-slate-100 text-slate-700 hover:bg-slate-200" 
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/15"
          }`}
        >
          <Plus className="h-4 w-4" /> {showAddForm ? "Close Form" : "Add Goal"}
        </button>
      </div>

      {/* Register Ambition Collapsible Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-5 animate-fade-in">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Create Goal</h4>
            <p className="text-[11px] text-slate-400">Add the target, year, location, and reason it matters.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Goal Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500 uppercase">Goal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Move into a Zurich leadership role"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                required
              />
            </div>

            {/* Goal Type */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500 uppercase">Goal Category</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 focus:outline-none"
              >
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Target Year */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500 uppercase">Target Year</label>
              <input
                type="number"
                value={targetYear}
                onChange={(e) => setTargetYear(Number(e.target.value))}
                min={new Date().getFullYear()}
                max={new Date().getFullYear() + 40}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 focus:outline-none"
                required
              />
            </div>

            {/* Target Country */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500 uppercase">Target Location</label>
              <select
                value={targetCountry}
                onChange={(e) => setTargetCountry(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 focus:outline-none"
              >
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Target Capital Requirement */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500 uppercase">Target Amount (USD)</label>
              <input
                type="number"
                value={targetIncome}
                onChange={(e) => setTargetIncome(e.target.value)}
                placeholder="e.g. 450000"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 focus:outline-none"
              />
            </div>

            {/* Priority */}
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-500 uppercase">Priority</label>
              <div className="flex gap-4 pt-1">
                {(["HIGH", "MED", "LOW"] as GoalPriority[]).map((p) => (
                  <label key={p} className="flex items-center gap-1.5 cursor-pointer text-xs">
                    <input
                      type="radio"
                      name="priority"
                      value={p}
                      checked={priority === p}
                      onChange={() => setPriority(p)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                      p === 'HIGH' ? 'bg-red-50 text-red-600' : p === 'MED' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'
                    }`}>{p}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-[11px] font-semibold text-slate-500 uppercase">Why This Goal Matters</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe why this milestone matters to your life plan."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-800 focus:outline-none min-h-[60px]"
                required
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Sparkles className="h-4 w-4 animate-spin" />
            {isSubmitting ? "Saving..." : "Save Goal"}
          </button>
        </form>
      )}

      {/* Goals Directory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => {
          return (
            <div 
              key={goal.id} 
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              {/* Header */}
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-slate-800 truncate">{goal.name}</h4>
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                      goal.priority === 'HIGH' 
                        ? 'bg-red-50 text-red-600 border border-red-100' 
                        : goal.priority === 'MED' 
                          ? 'bg-amber-50 text-amber-600 border border-amber-100' 
                          : 'bg-slate-100 text-slate-600'
                    }`}>
                      {goal.priority}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100/50">
                    Category: {goal.type}
                  </span>
                </div>

                <button
                  onClick={() => onDeleteGoal(goal.id)}
                  title="Remove Goal"
                  className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-2">
                {goal.description}
              </p>

              {/* Parameters & Targets */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-100 text-[11px] font-mono text-slate-500">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">Year {goal.targetYear}</span>
                </div>
                <div className="flex items-center gap-1.5 min-w-0">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{goal.targetCountry}</span>
                </div>
                {goal.targetIncome > 0 && (
                  <div className="flex items-center gap-1.5 col-span-2 min-w-0">
                    <DollarSign className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">Target Amount: ${goal.targetIncome.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Status and Alignment probability */}
              <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Status:</span>
                  <select
                    value={goal.status}
                    onChange={(e) => onUpdateGoalStatus(goal.id, e.target.value as GoalStatus)}
                    className="bg-slate-50 border border-slate-200 rounded px-2 py-0.5 text-xs text-slate-700"
                  >
                    {(["Active", "Simulating", "Paused", "Needs Review", "Completed"] as GoalStatus[]).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] font-mono bg-indigo-600 text-white font-bold px-2 py-1 rounded shadow-sm shadow-indigo-600/10">
                    {goal.probability || "Checking"}
                  </span>
                </div>
              </div>

            </div>
          );
        })}

        {goals.length === 0 && (
          <div className="col-span-2 p-12 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
            <AlertCircle className="h-8 w-8 text-slate-400 mx-auto" />
            <p className="text-xs text-slate-500 font-sans">Your goal list is empty. Add a goal above.</p>
          </div>
        )}
      </div>

    </div>
  );
}
