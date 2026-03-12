import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  fetchDashboardStats,
  fetchOpenJobs,
  fetchRecentCandidates,
} from '../data/mockData'
import type { CandidateStatus } from '../types'

export const Route = createFileRoute('/')({ component: Dashboard })

const STATUS_STYLES: Record<CandidateStatus, string> = {
  applied: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  screening: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  interview: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  offer: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  hired: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  rejected: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300',
}

const STAT_ICONS: Record<string, string> = {
  openPositions: '📋',
  totalCandidates: '👥',
  interviewsThisWeek: '🗓️',
  offersPending: '📨',
  hiredThisMonth: '🎉',
}

const STAT_LABELS: Record<string, string> = {
  openPositions: 'Open Positions',
  totalCandidates: 'Total Candidates',
  interviewsThisWeek: 'Interviews This Week',
  offersPending: 'Offers Pending',
  hiredThisMonth: 'Hired This Month',
}

function SkeletonCard({ count = 1 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          key={i}
          className="island-shell h-24 animate-pulse rounded-2xl"
        />
      ))}
    </>
  )
}

function Dashboard() {
  const statsQuery = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
  })

  const recentQuery = useQuery({
    queryKey: ['recent-candidates'],
    queryFn: () => fetchRecentCandidates(6),
  })

  const jobsQuery = useQuery({
    queryKey: ['open-jobs'],
    queryFn: fetchOpenJobs,
  })

  return (
    <main className="page-wrap px-4 pb-12 pt-10">
      {/* Hero */}
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-12">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
        <p className="island-kicker mb-2">HR & Recruitment Dashboard</p>
        <h1 className="display-title mb-4 text-3xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-5xl">
          Welcome to TalentFlow
        </h1>
        <p className="mb-7 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          Manage your recruitment pipeline end-to-end — from open roles and candidate tracking to streamlined hiring decisions.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/candidates"
            className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
          >
            View All Candidates
          </Link>
          <Link
            to="/apply"
            className="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-5 py-2.5 text-sm font-semibold text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]"
          >
            Post Application
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-[var(--sea-ink-soft)]">
          At a Glance
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {statsQuery.isPending ? (
            <SkeletonCard count={5} />
          ) : statsQuery.isError ? (
            <p className="col-span-5 text-sm text-red-500">Failed to load stats.</p>
          ) : (
            Object.entries(statsQuery.data).map(([key, value]) => (
              <div key={key} className="island-shell rise-in rounded-2xl p-5">
                <span className="text-2xl">{STAT_ICONS[key]}</span>
                <p className="mt-2 text-2xl font-bold text-[var(--sea-ink)]">{value}</p>
                <p className="mt-0.5 text-xs text-[var(--sea-ink-soft)]">{STAT_LABELS[key]}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Recent Applications + Open Roles */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Recent Applications */}
        <section className="island-shell rounded-2xl p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[var(--sea-ink)]">Recent Applications</h2>
            <Link to="/candidates" className="text-xs font-semibold text-[var(--lagoon-deep)] no-underline hover:underline">
              View all →
            </Link>
          </div>
          {recentQuery.isPending ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <div key={i} className="h-10 animate-pulse rounded-xl bg-[var(--line)]" />
              ))}
            </div>
          ) : recentQuery.isError ? (
            <p className="text-sm text-red-500">Failed to load candidates.</p>
          ) : (
            <ul className="divide-y divide-[var(--line)]">
              {recentQuery.data.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--sea-ink)]">{c.name}</p>
                    <p className="truncate text-xs text-[var(--sea-ink-soft)]">{c.role}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[c.status]}`}>
                      {c.status}
                    </span>
                    <span className="text-xs text-[var(--sea-ink-soft)]">{c.appliedDate}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Open Roles */}
        <section className="island-shell rounded-2xl p-5">
          <h2 className="mb-4 text-sm font-semibold text-[var(--sea-ink)]">Open Roles</h2>
          {jobsQuery.isPending ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                <div key={i} className="h-12 animate-pulse rounded-xl bg-[var(--line)]" />
              ))}
            </div>
          ) : jobsQuery.isError ? (
            <p className="text-sm text-red-500">Failed to load jobs.</p>
          ) : (
            <ul className="space-y-3">
              {jobsQuery.data.map((job) => (
                <li key={job.id} className="rounded-xl border border-[var(--line)] bg-[var(--foam)] px-3 py-2.5">
                  <p className="text-sm font-semibold text-[var(--sea-ink)]">{job.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-[var(--sea-ink-soft)]">
                    <span>{job.department}</span>
                    <span>·</span>
                    <span>{job.openings} opening{job.openings > 1 ? 's' : ''}</span>
                    <span>·</span>
                    <span>{job.applicants} applicants</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}


function App() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />
        <p className="island-kicker mb-3">TanStack Start Base Template</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--sea-ink)] sm:text-6xl">
          Start simple, ship quickly.
        </h1>
        <p className="mb-8 max-w-2xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
          This base starter intentionally keeps things light: two routes, clean
          structure, and the essentials you need to build from scratch.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/about"
            className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
          >
            About This Starter
          </a>
          <a
            href="https://tanstack.com/router"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-5 py-2.5 text-sm font-semibold text-[var(--sea-ink)] no-underline transition hover:-translate-y-0.5 hover:border-[rgba(23,58,64,0.35)]"
          >
            Router Guide
          </a>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [
            'Type-Safe Routing',
            'Routes and links stay in sync across every page.',
          ],
          [
            'Server Functions',
            'Call server code from your UI without creating API boilerplate.',
          ],
          [
            'Streaming by Default',
            'Ship progressively rendered responses for faster experiences.',
          ],
          [
            'Tailwind Native',
            'Design quickly with utility-first styling and reusable tokens.',
          ],
        ].map(([title, desc], index) => (
          <article
            key={title}
            className="island-shell feature-card rise-in rounded-2xl p-5"
            style={{ animationDelay: `${index * 90 + 80}ms` }}
          >
            <h2 className="mb-2 text-base font-semibold text-[var(--sea-ink)]">
              {title}
            </h2>
            <p className="m-0 text-sm text-[var(--sea-ink-soft)]">{desc}</p>
          </article>
        ))}
      </section>

      <section className="island-shell mt-8 rounded-2xl p-6">
        <p className="island-kicker mb-2">Quick Start</p>
        <ul className="m-0 list-disc space-y-2 pl-5 text-sm text-[var(--sea-ink-soft)]">
          <li>
            Edit <code>src/routes/index.tsx</code> to customize the home page.
          </li>
          <li>
            Update <code>src/components/Header.tsx</code> and{' '}
            <code>src/components/Footer.tsx</code> for brand links.
          </li>
          <li>
            Add routes in <code>src/routes</code> and tweak visual tokens in{' '}
            <code>src/styles.css</code>.
          </li>
        </ul>
      </section>
    </main>
  )
}
