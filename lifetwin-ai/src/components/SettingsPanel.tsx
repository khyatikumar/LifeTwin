import React, { useState } from "react";
import { UserSettings } from "../types";
import { Settings, Shield, Bell, Key, Save, CheckCircle2, AlertCircle } from "lucide-react";

interface SettingsPanelProps {
  settings: UserSettings;
  onUpdateSettings: (updatedSettings: UserSettings) => Promise<void>;
}

export default function SettingsPanel({ settings, onUpdateSettings }: SettingsPanelProps) {
  const [formData, setFormData] = useState<UserSettings>({ ...settings });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSavedSuccess(false);
    try {
      await onUpdateSettings(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to update user configurations:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm max-w-3xl animate-fade-in space-y-6">
      
      {/* View Header */}
      <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight uppercase font-geist">
            Account Settings
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Manage privacy, notifications, and account preferences.
          </p>
        </div>
        {savedSuccess && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full font-semibold animate-fade-in">
            <CheckCircle2 className="h-4 w-4" /> Settings saved successfully!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Module 1: Notifications */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
            <Bell className="h-4 w-4 text-indigo-600" /> Notifications
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl cursor-pointer hover:bg-slate-50/80">
              <div>
                <span className="text-xs font-semibold text-slate-800">Email Updates</span>
                <p className="text-[10px] text-slate-400">Receive weekly updates about your goals.</p>
              </div>
              <input
                type="checkbox"
                checked={formData.emailNotifications}
                onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl cursor-pointer hover:bg-slate-50/80">
              <div>
                <span className="text-xs font-semibold text-slate-800">Push Updates</span>
                <p className="text-[10px] text-slate-400">Get alerts when important money details change.</p>
              </div>
              <input
                type="checkbox"
                checked={formData.pushNotifications}
                onChange={(e) => setFormData({ ...formData, pushNotifications: e.target.checked })}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
            </label>
          </div>
        </div>

        {/* Module 2: Security & Privacy */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
            <Shield className="h-4 w-4 text-indigo-600" /> Privacy
          </h4>

          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-xs font-semibold text-slate-800">Profile Visibility</span>
                  <p className="text-[10px] text-slate-400">Choose who can view your planning profile.</p>
                </div>
                <select
                  value={formData.privacyMode}
                  onChange={(e) => setFormData({ ...formData, privacyMode: e.target.value as any })}
                  className="bg-white border border-slate-200 rounded px-2 py-1 text-xs text-slate-700"
                >
                  {["Public", "Private", "Incognito"].map(mode => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>
            </div>

            <label className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl cursor-pointer hover:bg-slate-50/80">
              <div>
                <span className="text-xs font-semibold text-slate-800">Anonymized Data Sharing</span>
                <p className="text-[10px] text-slate-400">Share non-personal trends to improve LifeTwin suggestions.</p>
              </div>
              <input
                type="checkbox"
                checked={formData.dataSharing}
                onChange={(e) => setFormData({ ...formData, dataSharing: e.target.checked })}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl cursor-pointer hover:bg-slate-50/80">
              <div>
                <span className="text-xs font-semibold text-slate-800">2-Factor Authentication</span>
                <p className="text-[10px] text-slate-400">Add an extra check when signing in.</p>
              </div>
              <input
                type="checkbox"
                checked={formData.twoFactorAuth}
                onChange={(e) => setFormData({ ...formData, twoFactorAuth: e.target.checked })}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
            </label>
          </div>
        </div>

        {/* Save Settings */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-all hover:shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save className="h-4.5 w-4.5" />
          {isSubmitting ? "Saving..." : "Save Settings"}
        </button>

      </form>

      {/* Module 3: Privacy Reminder */}
      <div className="p-4 bg-amber-50 border border-amber-200/60 rounded-xl space-y-2">
        <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wide flex items-center gap-1.5 font-geist">
          <Key className="h-4 w-4" /> Privacy Reminder
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed font-sans">
          LifeTwin works best when your profile, money details, goals, and timeline are kept up to date.
        </p>
        <p className="text-[10px] text-slate-400 font-mono">
          Your settings help shape the guidance you see across the workspace.
        </p>
      </div>

    </div>
  );
}
