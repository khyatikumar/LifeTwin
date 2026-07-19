/**
 * LifeTwin AI Shared Type Definitions
 */

export interface UserProfile {
  fullName: string;
  age: number;
  country: string;
  education: string;
  jobTitle: string;
  yearsOfExperience: number;
  annualIncome: number;
  careerGoal: string;
}

export interface FinancialProfile {
  monthlyIncome: number;
  monthlyExpenses: number;
  currentSavings: number;
  currentInvestments: number;
  outstandingLoans: string; // e.g. "$450k Mortgage" or number converted to string
  emergencyFundMonths: number;
  riskTolerance: string; // "Conservative", "Moderate", "Aggressive", etc.
}

export type GoalPriority = 'HIGH' | 'MED' | 'LOW';
export type GoalStatus = 'Active' | 'Simulating' | 'Paused' | 'Needs Review' | 'Completed';

export interface Goal {
  id: string;
  name: string;
  type: string; // "Financial", "Educational", "Career", "Personal", "Health", etc.
  description: string;
  priority: GoalPriority;
  targetIncome: number;
  targetCountry: string;
  targetYear: number;
  status: GoalStatus;
  probability?: string; // e.g., "74% Success" or "Needs Review"
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  eventDate: string; // e.g. "Today, 10:45 AM" or "Yesterday"
  eventType: string; // "Financial", "Milestone", "Update", etc.
  status: string; // "Completed", "Pending", etc.
}

export interface AIDecision {
  id: string;
  question: string;
  recommendation: string;
  confidenceScore: number; // e.g. 88
  reasoning: string; // detailed bullet or paragraph explanation
  date: string;
}

export interface SimulationResult {
  id: string;
  question: string;
  currentSalary: number;
  simulatedSalary: number;
  difference: number;
  recommendation: string;
  date: string;
}

export interface UserSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  twoFactorAuth: boolean;
  privacyMode: 'Public' | 'Private' | 'Incognito';
  dataSharing: boolean;
}

export interface AppState {
  profile: UserProfile;
  financial: FinancialProfile;
  goals: Goal[];
  timeline: TimelineEvent[];
  decisions: AIDecision[];
  simulations: SimulationResult[];
  settings: UserSettings;
}
