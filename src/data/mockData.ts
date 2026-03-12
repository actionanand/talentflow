import type {
  Candidate,
  CandidateStatus,
  DashboardStats,
  Department,
  Job,
} from '../types'

const FIRST_NAMES = [
  'Liam', 'Olivia', 'Noah', 'Emma', 'Oliver', 'Ava', 'Elijah', 'Sophia',
  'James', 'Isabella', 'William', 'Mia', 'Benjamin', 'Charlotte', 'Lucas',
  'Amelia', 'Henry', 'Harper', 'Alexander', 'Evelyn', 'Ethan', 'Abigail',
  'Daniel', 'Emily', 'Matthew', 'Ella', 'Aiden', 'Elizabeth', 'Jackson',
  'Camila', 'Sebastian', 'Luna', 'Jack', 'Sofia', 'Owen', 'Avery', 'Samuel',
  'Mila', 'Wyatt', 'Aria', 'Raj', 'Priya', 'Arjun', 'Anika', 'Wei', 'Mei',
  'Hassan', 'Fatima', 'Carlos', 'Isabella',
]

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
  'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark',
  'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King',
  'Wright', 'Scott', 'Torres', 'Nguyen', 'Patel', 'Shah', 'Kumar', 'Singh',
  'Chen', 'Wang', 'Zhang', 'Kim', 'Park', 'Ali', 'Khan', 'Hassan',
]

const ROLES = [
  'Senior Frontend Engineer',
  'Backend Engineer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Product Manager',
  'UX Designer',
  'UI Designer',
  'Data Scientist',
  'Machine Learning Engineer',
  'QA Engineer',
  'Technical Lead',
  'Engineering Manager',
  'Marketing Manager',
  'Content Strategist',
  'Sales Executive',
  'HR Business Partner',
  'Financial Analyst',
  'Operations Manager',
  'Cloud Architect',
  'Security Engineer',
]

const DEPARTMENTS: Department[] = [
  'Engineering', 'Design', 'Product', 'Marketing',
  'Sales', 'HR', 'Finance', 'Operations',
]

const STATUSES: CandidateStatus[] = [
  'applied', 'screening', 'interview', 'offer', 'hired', 'rejected',
]

const STATUS_WEIGHTS = [0.30, 0.25, 0.20, 0.10, 0.08, 0.07]

const LOCATIONS = [
  'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA',
  'Boston, MA', 'Chicago, IL', 'Los Angeles, CA', 'Denver, CO',
  'Atlanta, GA', 'Miami, FL', 'London, UK', 'Berlin, DE', 'Toronto, CA',
  'Sydney, AU', 'Singapore', 'Bangalore, IN', 'Dubai, UAE', 'Remote',
]

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

function weightedPick<T>(items: T[], weights: number[], rand: () => number): T {
  const r = rand()
  let cumulative = 0
  for (let i = 0; i < items.length; i++) {
    cumulative += weights[i]
    if (r < cumulative) return items[i]
  }
  return items[items.length - 1]
}

function generateDate(rand: () => number, daysBack: number): string {
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(rand() * daysBack))
  return date.toISOString().split('T')[0]
}

export function generateCandidates(count = 200): Candidate[] {
  const rand = seededRandom(42)
  return Array.from({ length: count }, (_, i) => {
    const firstName = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)]
    const lastName = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)]
    const name = `${firstName} ${lastName}`
    const role = ROLES[Math.floor(rand() * ROLES.length)]
    const department = DEPARTMENTS[Math.floor(rand() * DEPARTMENTS.length)]
    const status = weightedPick(STATUSES, STATUS_WEIGHTS, rand)
    const experience = Math.floor(rand() * 15) + 1
    const baseSalary = 60000 + experience * 8000
    return {
      id: `cand-${String(i + 1).padStart(4, '0')}`,
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@email.com`,
      role,
      department,
      status,
      appliedDate: generateDate(rand, 120),
      score: Math.floor(rand() * 40) + 60,
      location: LOCATIONS[Math.floor(rand() * LOCATIONS.length)],
      experience,
      expectedSalary: Math.round((baseSalary + rand() * 20000) / 1000) * 1000,
    }
  })
}

const ALL_CANDIDATES = generateCandidates(200)

export const OPEN_ROLES: string[] = [
  'Senior Frontend Engineer',
  'Backend Engineer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Product Manager',
  'UX Designer',
  'Data Scientist',
  'Marketing Manager',
  'Sales Executive',
]

// Simulated async API calls
export async function fetchDashboardStats(): Promise<DashboardStats> {
  await new Promise((r) => setTimeout(r, 400))
  const hired = ALL_CANDIDATES.filter((c) => c.status === 'hired').length
  const offer = ALL_CANDIDATES.filter((c) => c.status === 'offer').length
  const interview = ALL_CANDIDATES.filter((c) => c.status === 'interview').length
  return {
    openPositions: 12,
    totalCandidates: ALL_CANDIDATES.length,
    interviewsThisWeek: Math.min(interview, 18),
    offersPending: offer,
    hiredThisMonth: Math.min(hired, 9),
  }
}

export async function fetchOpenJobs(): Promise<Job[]> {
  await new Promise((r) => setTimeout(r, 300))
  return [
    { id: 'job-001', title: 'Senior Frontend Engineer', department: 'Engineering', openings: 2, applicants: 34, daysOpen: 14 },
    { id: 'job-002', title: 'Backend Engineer', department: 'Engineering', openings: 3, applicants: 27, daysOpen: 21 },
    { id: 'job-003', title: 'Product Manager', department: 'Product', openings: 1, applicants: 41, daysOpen: 7 },
    { id: 'job-004', title: 'UX Designer', department: 'Design', openings: 1, applicants: 19, daysOpen: 30 },
    { id: 'job-005', title: 'DevOps Engineer', department: 'Engineering', openings: 2, applicants: 15, daysOpen: 10 },
    { id: 'job-006', title: 'Marketing Manager', department: 'Marketing', openings: 1, applicants: 22, daysOpen: 18 },
  ]
}

export async function fetchRecentCandidates(limit = 5): Promise<Candidate[]> {
  await new Promise((r) => setTimeout(r, 300))
  return [...ALL_CANDIDATES]
    .sort((a, b) => b.appliedDate.localeCompare(a.appliedDate))
    .slice(0, limit)
}

export async function fetchAllCandidates(): Promise<Candidate[]> {
  await new Promise((r) => setTimeout(r, 600))
  return ALL_CANDIDATES
}
