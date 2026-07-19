import React, { useState } from "react";
import { UserProfile } from "../types";
import { User, Calendar, MapPin, Award, Briefcase, AwardIcon, DollarSign, Target, Save, CheckCircle2 } from "lucide-react";

interface ProfileFormProps {
  profile: UserProfile;
  onUpdateProfile: (updatedProfile: UserProfile) => Promise<void>;
}

export default function ProfileForm({ profile, onUpdateProfile }: ProfileFormProps) {
  const [formData, setFormData] = useState<UserProfile>({ ...profile });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSavedSuccess(false);
    try {
      await onUpdateProfile(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const countries = [
    "United States", "Switzerland", "United Kingdom", "Germany", 
    "Singapore", "Canada", "Australia", "Japan", "India"
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm max-w-4xl animate-fade-in space-y-6">
      
      {/* View Header */}
      <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight uppercase font-geist">
            Personal Profile
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Update your personal, education, and career details.
          </p>
        </div>
        {savedSuccess && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full font-semibold animate-fade-in">
            <CheckCircle2 className="h-4 w-4" /> Profile updated successfully!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                placeholder="Alex Sterling"
                required
              />
            </div>
          </div>

          {/* Age */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Age</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="number"
                value={formData.age || ""}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                placeholder="34"
                min="18"
                max="120"
                required
              />
            </div>
          </div>

          {/* Country of Residence */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Country of Residence</label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all appearance-none"
              >
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Education Credentials */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Highest Education</label>
            <div className="relative">
              <Award className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                placeholder="MBA, Stanford Graduate School of Business"
                required
              />
            </div>
          </div>

          {/* Professional Job Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Job Title</label>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                placeholder="Director of Strategy"
                required
              />
            </div>
          </div>

          {/* Years of Experience */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Professional Experience (Years)</label>
            <div className="relative">
              <AwardIcon className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="number"
                value={formData.yearsOfExperience || ""}
                onChange={(e) => setFormData({ ...formData, yearsOfExperience: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                placeholder="12"
                min="0"
                required
              />
            </div>
          </div>

          {/* Annual Income */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Annual Income (USD)</label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="number"
                value={formData.annualIncome || ""}
                onChange={(e) => setFormData({ ...formData, annualIncome: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
                placeholder="221400"
                min="0"
                required
              />
            </div>
          </div>

          {/* Career Goal */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Career Goal</label>
            <div className="relative">
              <Target className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <textarea
                value={formData.careerGoal}
                onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all min-h-[90px] resize-y"
                placeholder="Describe your main career goal..."
                required
              />
            </div>
          </div>

        </div>

        {/* Form Submission Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-all hover:shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Save className="h-4.5 w-4.5" />
          {isSubmitting ? "Saving..." : "Save Personal Profile"}
        </button>

      </form>
    </div>
  );
}
