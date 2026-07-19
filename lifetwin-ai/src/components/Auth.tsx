import React, { useState } from "react";
import { Sparkles, Brain, Lock, Mail, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { authService } from "../services/authService";

interface AuthProps {
  onLoginSuccess: (token: string, email: string, fullName: string) => void;
}

export default function Auth({ onLoginSuccess }: AuthProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAutofillDemo = () => {
    setEmail("demo@lifetwin.ai");
    setPassword("password123");
    setFullName("Alex Sterling");
    setIsSignup(false);
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    if (isSignup && !fullName) {
      setError("Please enter your full name.");
      setIsLoading(false);
      return;
    }

    try {
      if (isSignup) {
        await authService.signup(fullName,email, password);
        setSuccessMessage("Account created successfully. Signing you in...");
      }

      const login = await authService.login(email, password);
      onLoginSuccess(login.access_token, email, fullName || email.split("@")[0]);
    } catch (err) {
      console.error("Auth request error:", err);
      setError(err instanceof Error ? err.message : "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
      
      {/* LEFT COLUMN: Premium Info Branding Panel */}
      <div className="md:w-1/2 bg-slate-50 border-r border-slate-100 flex flex-col justify-between p-8 md:p-16 relative overflow-hidden">
        {/* Background ambient mesh */}
        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-100 pointer-events-none">
          <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-indigo-100/40 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-100/40 rounded-full blur-[100px]"></div>
          
          {/* Faint network nodes map simulation */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        {/* Branding Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
            <Sparkles className="h-5.5 w-5.5" />
          </div>
          <div>
            <span className="font-geist font-bold text-slate-900 tracking-tight text-xl">LifeTwin</span>
            <p className="text-[10px] text-indigo-600 font-mono tracking-wider uppercase">Personal Decision Guide</p>
          </div>
        </div>

        {/* Informative Value Proposition Copy */}
        <div className="relative z-10 my-12 md:my-0 space-y-6 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-550/10 text-indigo-700 text-xs font-mono rounded-full border border-indigo-200/50">
            <Brain className="h-3.5 w-3.5 animate-pulse" /> Life Plan Ready
          </div>
          <h2 className="font-geist font-bold text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight">
            Plan your next life decision with more clarity.
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            LifeTwin brings your career profile, money picture, and personal goals together so you can compare choices with confidence.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-4 border-t border-slate-200">
            <div>
              <p className="text-slate-900 font-geist font-semibold text-lg">74%</p>
              <p className="text-[11px] text-slate-500">Goal Readiness Score</p>
            </div>
            <div>
              <p className="text-slate-900 font-geist font-semibold text-lg">Instant</p>
              <p className="text-[11px] text-slate-500">Career Path Planning</p>
            </div>
          </div>
        </div>

        {/* Footer Credit */}
        <div className="relative z-10 text-slate-400 text-xs font-mono">
          © 2026 LifeTwin. Private planning workspace.
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Login / Signup Form */}
      <div className="md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white">
        <div className="w-full max-w-sm space-y-8 animate-fade-in">
          <div className="space-y-2">
            <h3 className="font-geist font-bold text-2xl text-slate-900 tracking-tight">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h3>
            <p className="text-sm text-slate-500">
              {isSignup 
                ? "Enter your details to create your LifeTwin account." 
                : "Log in to continue to your LifeTwin dashboard."}
            </p>
          </div>

          {/* Quick Demo Login Shortcut */}
          <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-indigo-600 uppercase font-semibold">Sample Profile</span>
              <p className="text-xs text-slate-600">Fill the form with example account details</p>
            </div>
            <button
              type="button"
              onClick={handleAutofillDemo}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer hover:shadow-lg shadow-indigo-600/20"
            >
              Demo User <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs text-red-600">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-xs text-emerald-700">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alexander Wright"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-850 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@lifetwin.ai"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm text-slate-850 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-500 uppercase">Secure Password</label>
                {!isSignup && (
                  <button 
                    type="button"
                    onClick={() => alert("Use the sample profile or enter your account password.")} 
                    className="text-[11px] text-indigo-600 hover:underline hover:text-indigo-700"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-10 text-sm text-slate-850 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:bg-white transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg text-sm transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-600/10 cursor-pointer"
            >
              {isLoading ? "Please wait..." : isSignup ? "Create Account" : "Log In"}
            </button>
          </form>

          {/* Tab Switcher Link */}
          <div className="text-center text-xs text-slate-500">
            <span>{isSignup ? "Already have an account?" : "Don't have an account?"}</span>{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
                setSuccessMessage("");
              }}
              className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
            >
              {isSignup ? "Log in" : "Create account"}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
