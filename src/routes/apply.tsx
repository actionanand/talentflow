import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { OPEN_ROLES } from '../data/mockData'
import type { ApplicationFormData } from '../types'

export const Route = createFileRoute('/apply')({ component: ApplyPage })

const EXPERIENCE_OPTIONS = [
  '0–1 years (Junior)',
  '2–3 years (Mid-level)',
  '4–6 years (Senior)',
  '7–10 years (Lead / Staff)',
  '10+ years (Principal / Architect)',
]

function FieldError({ msg }: { msg?: string | false | undefined }) {
  if (!msg) return null
  return <p className="mt-1 text-xs text-red-500">{msg}</p>
}

function Label({ required, children }: { required?: boolean; children: React.ReactNode }) {
  return (
    <label className="mb-1 block text-sm font-semibold text-[var(--sea-ink)]">
      {children}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>
  )
}

const inputCls =
  'w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--sea-ink)] placeholder:text-[var(--sea-ink-soft)] focus:border-[var(--lagoon)] focus:outline-none transition'

const errorInputCls =
  'w-full rounded-xl border border-red-400 bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--sea-ink)] placeholder:text-[var(--sea-ink-soft)] focus:border-red-400 focus:outline-none transition'

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function isValidPhone(v: string) {
  return /^[+]?[\d\s\-().]{7,20}$/.test(v)
}

function isValidUrl(v: string) {
  if (!v) return true // optional
  try {
    new URL(v)
    return true
  } catch {
    return false
  }
}

function ApplyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState('')

  const form = useForm<ApplicationFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      role: '',
      experience: '',
      linkedIn: '',
      portfolio: '',
      coverLetter: '',
    },
    onSubmit: async ({ value }) => {
      // Simulate API submission
      await new Promise((r) => setTimeout(r, 900))
      setSubmittedName(value.fullName)
      setSubmitted(true)
    },
  })

  if (submitted) {
    return (
      <main className="page-wrap px-4 pb-12 pt-10">
        <div className="island-shell rise-in relative mx-auto max-w-xl overflow-hidden rounded-[2rem] px-8 py-12 text-center">
          <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.28),transparent_66%)]" />
          <p className="text-5xl">🎉</p>
          <h1 className="mt-4 text-2xl font-bold text-[var(--sea-ink)]">Application Submitted!</h1>
          <p className="mt-3 text-sm text-[var(--sea-ink-soft)]">
            Thank you, <strong>{submittedName}</strong>! Your application has been received.
            Our team will review it and get back to you within 5 business days.
          </p>
          <button
            type="button"
            onClick={() => { setSubmitted(false); form.reset() }}
            className="mt-7 rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-6 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
          >
            Submit Another Application
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="page-wrap px-4 pb-12 pt-10">
      <div className="mx-auto max-w-2xl">
        <p className="island-kicker mb-1">Join our Team</p>
        <h1 className="mb-1 text-2xl font-bold text-[var(--sea-ink)] sm:text-3xl">Job Application</h1>
        <p className="mb-7 text-sm text-[var(--sea-ink-soft)]">
          Complete the form below and we'll be in touch. Fields marked <span className="text-red-500">*</span> are required.
        </p>

        <form
          className="island-shell space-y-6 rounded-2xl p-6 sm:p-8"
          onSubmit={(e) => { e.preventDefault(); e.stopPropagation(); form.handleSubmit() }}
        >

          {/* Full Name */}
          <form.Field
            name="fullName"
            validators={{ onBlur: ({ value }) => !value.trim() ? 'Full name is required.' : value.trim().length < 2 ? 'Name must be at least 2 characters.' : undefined }}
          >
            {(field) => (
              <div>
                <Label required>Full Name</Label>
                <input
                  type="text"
                  placeholder="e.g. Jane Smith"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={field.state.meta.errors.length ? errorInputCls : inputCls}
                />
                <FieldError msg={field.state.meta.errors[0]?.message} />
              </div>
            )}
          </form.Field>

          {/* Email + Phone row */}
          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field
              name="email"
              validators={{ onBlur: ({ value }) => !value.trim() ? 'Email is required.' : !isValidEmail(value) ? 'Please enter a valid email.' : undefined }}
            >
              {(field) => (
                <div>
                  <Label required>Email Address</Label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={field.state.meta.errors.length ? errorInputCls : inputCls}
                  />
                  <FieldError msg={field.state.meta.errors[0]?.message} />
                </div>
              )}
            </form.Field>

            <form.Field
              name="phone"
              validators={{ onBlur: ({ value }) => !value.trim() ? 'Phone number is required.' : !isValidPhone(value) ? 'Enter a valid phone number.' : undefined }}
            >
              {(field) => (
                <div>
                  <Label required>Phone Number</Label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={field.state.meta.errors.length ? errorInputCls : inputCls}
                  />
                  <FieldError msg={field.state.meta.errors[0]?.message} />
                </div>
              )}
            </form.Field>
          </div>

          {/* Role + Experience row */}
          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field
              name="role"
              validators={{ onBlur: ({ value }) => !value ? 'Please select a role.' : undefined }}
            >
              {(field) => (
                <div>
                  <Label required>Applying For</Label>
                  <select
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={field.state.meta.errors.length ? errorInputCls : inputCls}
                  >
                    <option value="">Select a role…</option>
                    {OPEN_ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <FieldError msg={field.state.meta.errors[0]?.message} />
                </div>
              )}
            </form.Field>

            <form.Field
              name="experience"
              validators={{ onBlur: ({ value }) => !value ? 'Please select your experience level.' : undefined }}
            >
              {(field) => (
                <div>
                  <Label required>Years of Experience</Label>
                  <select
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={field.state.meta.errors.length ? errorInputCls : inputCls}
                  >
                    <option value="">Select level…</option>
                    {EXPERIENCE_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                  <FieldError msg={field.state.meta.errors[0]?.message} />
                </div>
              )}
            </form.Field>
          </div>

          {/* LinkedIn + Portfolio */}
          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field
              name="linkedIn"
              validators={{ onBlur: ({ value }) => value && !isValidUrl(value) ? 'Enter a valid LinkedIn URL.' : undefined }}
            >
              {(field) => (
                <div>
                  <Label>LinkedIn Profile</Label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/…"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={field.state.meta.errors.length ? errorInputCls : inputCls}
                  />
                  <FieldError msg={field.state.meta.errors[0]?.message} />
                </div>
              )}
            </form.Field>

            <form.Field
              name="portfolio"
              validators={{ onBlur: ({ value }) => value && !isValidUrl(value) ? 'Enter a valid portfolio URL.' : undefined }}
            >
              {(field) => (
                <div>
                  <Label>Portfolio / GitHub</Label>
                  <input
                    type="url"
                    placeholder="https://github.com/…"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={field.state.meta.errors.length ? errorInputCls : inputCls}
                  />
                  <FieldError msg={field.state.meta.errors[0]?.message} />
                </div>
              )}
            </form.Field>
          </div>

          {/* Cover Letter */}
          <form.Field
            name="coverLetter"
            validators={{ onBlur: ({ value }) => !value.trim() ? 'Cover letter is required.' : value.trim().length < 100 ? `Please write at least 100 characters (currently ${value.trim().length}).` : undefined }}
          >
            {(field) => (
              <div>
                <Label required>Cover Letter</Label>
                <textarea
                  rows={6}
                  placeholder="Tell us about yourself, your experience, and why you're excited about this role…"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`resize-none ${field.state.meta.errors.length ? errorInputCls : inputCls}`}
                />
                <div className="mt-1 flex items-start justify-between">
                  <FieldError msg={field.state.meta.errors[0]?.message} />
                  <span className={`ml-auto text-xs ${field.state.value.trim().length >= 100 ? 'text-green-600' : 'text-[var(--sea-ink-soft)]'}`}>
                    {field.state.value.trim().length} / 100 min
                  </span>
                </div>
              </div>
            )}
          </form.Field>

          {/* Submit */}
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className="w-full rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] py-3 text-sm font-semibold text-[var(--lagoon-deep)] transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting…' : 'Submit Application'}
              </button>
            )}
          </form.Subscribe>
        </form>
      </div>
    </main>
  )
}
