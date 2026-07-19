import { AIDecision, AppState, FinancialProfile, Goal, GoalPriority, GoalStatus, SimulationResult, TimelineEvent, UserProfile, UserSettings } from "../types";

export type BackendProfile = {
  id: string;
  user_id: string;
  full_name: string;
  age: number;
  country: string;
  education: string;
  job_title: string;
  years_of_experience: number;
  annual_income: number;
  career_goal: string;
};

export type BackendFinancial = {
  id: string;
  user_id: string;
  monthly_income: number;
  monthly_expenses: number;
  current_savings: number;
  current_investments: number;
  outstanding_loans: number;
  risk_tolerance: "low" | "medium" | "high";
  emergency_fund_months: number;
};

export type BackendGoal = {
  id: string;
  user_id: string;
  goal_name: string;
  goal_type: string;
  description: string | null;
  target_year: number | null;
  priority: number;
  target_income: number | null;
  target_country: string | null;
  status: string;
};

export type BackendTimelineEvent = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_type: string;
  status: string;
};

export type BackendDecisionHistory = {
  id: string;
  user_id: string;
  question: string;
  decision_type: string;
  recommendation: string | null;
  confidence_score: number | null;
  created_at: string;
};

export type BackendDashboard = {
  profile: BackendProfile | null;
  financial: BackendFinancial | null;
  goals: BackendGoal[];
  timeline: BackendTimelineEvent[];
  history: BackendDecisionHistory[];
};

export const defaultSettings: UserSettings = {
  emailNotifications: true,
  pushNotifications: true,
  twoFactorAuth: false,
  privacyMode: "Private",
  dataSharing: false,
};

export const emptyProfile: UserProfile = {
  fullName: "",
  age: 18,
  country: "United States",
  education: "",
  jobTitle: "",
  yearsOfExperience: 0,
  annualIncome: 0,
  careerGoal: "",
};

export const emptyFinancial: FinancialProfile = {
  monthlyIncome: 0,
  monthlyExpenses: 0,
  currentSavings: 0,
  currentInvestments: 0,
  outstandingLoans: "0",
  emergencyFundMonths: 0,
  riskTolerance: "medium",
};

export function toBackendProfile(profile: UserProfile) {
  return {
    full_name: profile.fullName,
    age: profile.age,
    country: profile.country,
    education: profile.education,
    job_title: profile.jobTitle,
    years_of_experience: profile.yearsOfExperience,
    annual_income: profile.annualIncome,
    career_goal: profile.careerGoal,
  };
}

export function fromBackendProfile(profile: BackendProfile | null): UserProfile {
  if (!profile) return emptyProfile;
  return {
    fullName: profile.full_name,
    age: profile.age,
    country: profile.country,
    education: profile.education,
    jobTitle: profile.job_title,
    yearsOfExperience: profile.years_of_experience,
    annualIncome: profile.annual_income,
    careerGoal: profile.career_goal,
  };
}

export function toBackendFinancial(financial: FinancialProfile) {
  return {
    monthly_income: financial.monthlyIncome,
    monthly_expenses: financial.monthlyExpenses,
    current_savings: financial.currentSavings,
    current_investments: financial.currentInvestments,
    outstanding_loans: Number(String(financial.outstandingLoans).replace(/[^0-9.-]/g, "")) || 0,
    risk_tolerance: normalizeRisk(financial.riskTolerance),
    emergency_fund_months: financial.emergencyFundMonths,
  };
}

export function fromBackendFinancial(financial: BackendFinancial | null): FinancialProfile {
  if (!financial) return emptyFinancial;
  return {
    monthlyIncome: financial.monthly_income,
    monthlyExpenses: financial.monthly_expenses,
    currentSavings: financial.current_savings,
    currentInvestments: financial.current_investments,
    outstandingLoans: String(financial.outstanding_loans ?? 0),
    emergencyFundMonths: financial.emergency_fund_months,
    riskTolerance: financial.risk_tolerance,
  };
}

export function toBackendGoal(goal: Partial<Goal>) {
  return {
    goal_name: goal.name || "",
    goal_type: goal.type || "Career",
    description: goal.description || null,
    target_year: goal.targetYear || null,
    priority: priorityToNumber(goal.priority),
    target_income: goal.targetIncome || null,
    target_country: goal.targetCountry || null,
  };
}

export function fromBackendGoal(goal: BackendGoal): Goal {
  return {
    id: goal.id,
    name: goal.goal_name,
    type: goal.goal_type,
    description: goal.description || "",
    priority: numberToPriority(goal.priority),
    targetIncome: goal.target_income || 0,
    targetCountry: goal.target_country || "",
    targetYear: goal.target_year || new Date().getFullYear(),
    status: normalizeStatus(goal.status),
    probability: "Synced",
  };
}

export function toBackendTimelineEvent(event: Partial<TimelineEvent>) {
  return {
    title: event.title || "",
    description: event.description || null,
    event_date: event.eventDate || new Date().toISOString().slice(0, 10),
    event_type: event.eventType || "Milestone",
  };
}

export function toBackendTimelineUpdate(event: TimelineEvent) {
  return {
    ...toBackendTimelineEvent(event),
    status: event.status,
  };
}

export function fromBackendTimelineEvent(event: BackendTimelineEvent): TimelineEvent {
  return {
    id: event.id,
    title: event.title,
    description: event.description || "",
    eventDate: event.event_date,
    eventType: event.event_type,
    status: event.status,
  };
}

export function fromBackendHistory(history: BackendDecisionHistory): AIDecision {
  return {
    id: history.id,
    question: history.question,
    recommendation: history.recommendation || "",
    confidenceScore: confidenceToPercent(history.confidence_score),
    reasoning: history.decision_type,
    date: formatDate(history.created_at),
  };
}

export function fromDecisionResponse(question: string, response: { recommendation: string; confidence: number; reasoning: string }): AIDecision {
  return {
    id: crypto.randomUUID(),
    question,
    recommendation: response.recommendation,
    confidenceScore: confidenceToPercent(response.confidence),
    reasoning: response.reasoning,
    date: formatDate(new Date().toISOString()),
  };
}

export function fromSimulationResponse(question: string, response: { current_salary: number; simulated_salary: number; difference: number; recommendation: string }): SimulationResult {
  return {
    id: crypto.randomUUID(),
    question,
    currentSalary: response.current_salary,
    simulatedSalary: response.simulated_salary,
    difference: response.difference,
    recommendation: response.recommendation,
    date: formatDate(new Date().toISOString()),
  };
}

export function fromBackendDashboard(dashboard: BackendDashboard): AppState {
  return {
    profile: fromBackendProfile(dashboard.profile),
    financial: fromBackendFinancial(dashboard.financial),
    goals: [...dashboard.goals].map(fromBackendGoal),
    timeline: [...dashboard.timeline]
      .map(fromBackendTimelineEvent)
      .sort((a, b) => b.eventDate.localeCompare(a.eventDate)),
    decisions: [...dashboard.history].map(fromBackendHistory),
    simulations: [],
    settings: loadSettings(),
  };
}

export function loadSettings(): UserSettings {
  try {
    const saved = localStorage.getItem("lifetwin_settings");
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: UserSettings) {
  localStorage.setItem("lifetwin_settings", JSON.stringify(settings));
}

function normalizeRisk(value: string) {
  const lower = value.toLowerCase();
  if (lower.includes("high") || lower.includes("aggressive") || lower.includes("speculative")) return "high";
  if (lower.includes("low") || lower.includes("conservative")) return "low";
  return "medium";
}

function priorityToNumber(priority?: GoalPriority) {
  if (priority === "HIGH") return 5;
  if (priority === "LOW") return 1;
  return 3;
}

function numberToPriority(priority: number): GoalPriority {
  if (priority >= 4) return "HIGH";
  if (priority <= 2) return "LOW";
  return "MED";
}

function normalizeStatus(status: string): GoalStatus {
  const allowed: GoalStatus[] = ["Active", "Simulating", "Paused", "Needs Review", "Completed"];
  const match = allowed.find((item) => item.toLowerCase() === status.toLowerCase());
  return match || "Active";
}

function confidenceToPercent(value: number | null | undefined) {
  if (value == null) return 0;
  return value <= 1 ? Math.round(value * 100) : Math.round(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
