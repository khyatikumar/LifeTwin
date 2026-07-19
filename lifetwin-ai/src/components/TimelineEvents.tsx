import React, { useState } from "react";
import { TimelineEvent } from "../types";
import { Clock, Plus, Activity, DollarSign, Brain, RefreshCw, Calendar, Trash2 } from "lucide-react";

interface TimelineEventsProps {
  timeline: TimelineEvent[];
  onAddEvent: (newEvent: Partial<TimelineEvent>) => Promise<void>;
  onUpdateEvent: (event: TimelineEvent) => Promise<void>;
  onDeleteEvent: (id: string) => Promise<void>;
}

export default function TimelineEvents({ timeline, onAddEvent, onUpdateEvent, onDeleteEvent }: TimelineEventsProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState(new Date().toISOString().slice(0, 10));
  const [eventType, setEventType] = useState("Milestone");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        title,
        description,
        eventType,
        eventDate,
        status: "Completed"
      };

      if (editingId) {
        await onUpdateEvent({ id: editingId, ...payload });
      } else {
        await onAddEvent(payload);
      }
      setTitle("");
      setDescription("");
      setEventDate(new Date().toISOString().slice(0, 10));
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      console.error("Failed to append timeline event:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const beginEdit = (event: TimelineEvent) => {
    setEditingId(event.id);
    setTitle(event.title);
    setDescription(event.description);
    setEventDate(event.eventDate);
    setEventType(event.eventType);
    setShowForm(true);
  };

  const getEventBadgeClass = (type: string) => {
    switch (type) {
      case "Financial":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "AI Decision":
        return "bg-indigo-50 text-indigo-700 border-indigo-100";
      case "Simulation":
        return "bg-pink-50 text-pink-700 border-pink-100";
      case "Milestone":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Update":
        return "bg-amber-50 text-amber-700 border-amber-100";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm max-w-4xl animate-fade-in space-y-6">
      
      {/* View Header with Toggle */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight uppercase font-geist">
            Chronological Life Vector
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Audit automatic synchronizations, strategic decision logs, and manual milestones.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`px-3.5 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
            showForm 
              ? "bg-slate-100 text-slate-700 hover:bg-slate-200" 
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/10"
          }`}
        >
          <Plus className="h-4 w-4" /> {showForm ? "Collapse Panel" : "Register Event"}
        </button>
      </div>

      {/* Inline Registration Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-semibold text-slate-500 uppercase">Event Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Vanguard Portfolio Synced"
                className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-500 uppercase">Category</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs"
              >
                {["Milestone", "Financial", "AI Decision", "Simulation", "Update"].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-500 uppercase">Event Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-semibold text-slate-500 uppercase">Description Details</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Synced Vanguard investments, tracking a positive shift of 4% index growth."
                className="w-full bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs focus:outline-none"
                required
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer"
          >
            {isSubmitting ? "Registering..." : editingId ? "Update Chronological Milestone" : "Append Chronological Milestone"}
          </button>
        </form>
      )}

      {/* Main Vertically Connected Timeline Feed */}
      <div className="relative border-l border-slate-200 pl-6 space-y-6 ml-3">
        
        {timeline.map((event) => (
          <div key={event.id} className="relative animate-fade-in group">
            {/* Timeline Bubble Node */}
            <span className="absolute -left-[35px] top-1.5 h-4.5 w-4.5 rounded-full bg-white border-3 border-indigo-600 ring-4 ring-slate-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
              <Clock className="h-2 w-2" />
            </span>

            {/* Event Body Card */}
            <div className="p-4 rounded-xl border border-slate-150 bg-slate-50/50 hover:bg-slate-50 transition-colors flex justify-between items-start gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-xs font-bold text-slate-900">{event.title}</h4>
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase border ${getEventBadgeClass(event.eventType)}`}>
                    {event.eventType}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{event.description}</p>
                
                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {event.eventDate}</span>
                  <span className="text-emerald-500 font-semibold">• status: {event.status}</span>
                </div>
              </div>

              {/* Delete event button */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={() => beginEdit(event)}
                  className="p-1 text-slate-400 hover:text-indigo-600 rounded hover:bg-white/80 cursor-pointer"
                  title="Edit Entry"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => onDeleteEvent(event.id)}
                  className="p-1 text-slate-400 hover:text-red-500 rounded hover:bg-white/80 cursor-pointer"
                  title="Remove Entry"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {timeline.length === 0 && (
          <div className="text-center p-12 text-slate-400 text-xs font-sans">
            Your personal chronological vector is clear. Use 'Register Event' to append milestones.
          </div>
        )}

      </div>

    </div>
  );
}
