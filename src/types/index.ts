export type CandidateStatus =
  | 'applied'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'hired'
  | 'rejected'

export type Department =
  | 'Engineering'
  | 'Design'
  | 'Product'
  | 'Marketing'
  | 'Sales'
  | 'HR'
  | 'Finance'
  | 'Operations'

export interface Candidate {
  id: string
  name: string
  email: string
  role: string
  department: Department
  status: CandidateStatus
  appliedDate: string
  score: number
  location: string
  experience: number
  expectedSalary: number
}

export interface Job {
  id: string
  title: string
  department: Department
  openings: number
  applicants: number
  daysOpen: number
}

export interface DashboardStats {
  openPositions: number
  totalCandidates: number
  interviewsThisWeek: number
  offersPending: number
  hiredThisMonth: number
}

export interface ApplicationFormData {
  fullName: string
  email: string
  phone: string
  role: string
  experience: string
  linkedIn: string
  portfolio: string
  coverLetter: string
}
