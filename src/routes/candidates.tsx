import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef, useState } from 'react'
import { fetchAllCandidates } from '../data/mockData'
import type { Candidate, CandidateStatus } from '../types'

export const Route = createFileRoute('/candidates')({ component: CandidatesPage })

const STATUS_STYLES: Record<CandidateStatus, string> = {
  applied: 'bg-blue-100 text-blue-700',
  screening: 'bg-yellow-100 text-yellow-700',
  interview: 'bg-purple-100 text-purple-700',
  offer: 'bg-orange-100 text-orange-700',
  hired: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-600',
}

const SCORE_COLOR = (score: number) => {
  if (score >= 85) return 'text-green-600 font-bold'
  if (score >= 70) return 'text-yellow-600 font-semibold'
  return 'text-red-500 font-semibold'
}

const columns: ColumnDef<Candidate>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 180,
    cell: (info) => (
      <div>
        <p className="font-semibold text-[var(--sea-ink)]">{info.getValue<string>()}</p>
        <p className="text-xs text-[var(--sea-ink-soft)]">{info.row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: 'Role',
    size: 200,
    cell: (info) => (
      <div>
        <p className="text-sm text-[var(--sea-ink)]">{info.getValue<string>()}</p>
        <p className="text-xs text-[var(--sea-ink-soft)]">{info.row.original.department}</p>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 110,
    cell: (info) => {
      const s = info.getValue<CandidateStatus>()
      return (
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[s]}`}>
          {s}
        </span>
      )
    },
  },
  {
    accessorKey: 'score',
    header: 'Score',
    size: 80,
    cell: (info) => (
      <span className={`text-sm ${SCORE_COLOR(info.getValue<number>())}`}>
        {info.getValue<number>()}
      </span>
    ),
  },
  {
    accessorKey: 'location',
    header: 'Location',
    size: 160,
    cell: (info) => <span className="text-sm text-[var(--sea-ink-soft)]">{info.getValue<string>()}</span>,
  },
  {
    accessorKey: 'experience',
    header: 'Exp (yrs)',
    size: 90,
    cell: (info) => <span className="text-sm text-[var(--sea-ink)]">{info.getValue<number>()}</span>,
  },
  {
    accessorKey: 'appliedDate',
    header: 'Applied',
    size: 110,
    cell: (info) => <span className="text-sm text-[var(--sea-ink-soft)]">{info.getValue<string>()}</span>,
  },
]

function CandidatesPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const { data: candidates = [], isPending, isError } = useQuery({
    queryKey: ['all-candidates'],
    queryFn: fetchAllCandidates,
  })

  const table = useReactTable({
    data: candidates,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 64,
    overscan: 12,
  })

  const virtualItems = rowVirtualizer.getVirtualItems()
  const totalSize = rowVirtualizer.getTotalSize()
  const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0
  const paddingBottom = virtualItems.length > 0 ? totalSize - (virtualItems[virtualItems.length - 1].end ?? 0) : 0

  return (
    <main className="page-wrap px-4 pb-12 pt-10">
      {/* Header */}
      <div className="mb-6">
        <p className="island-kicker mb-1">Recruitment Pipeline</p>
        <h1 className="text-2xl font-bold text-[var(--sea-ink)] sm:text-3xl">All Candidates</h1>
        <p className="mt-1 text-sm text-[var(--sea-ink-soft)]">
          {isPending ? 'Loading…' : `${rows.length} of ${candidates.length} candidates shown`}
          {' '}· Virtualised for performance with TanStack Virtual
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search name, role, location, status…"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full max-w-md rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--sea-ink)] placeholder:text-[var(--sea-ink-soft)] focus:border-[var(--lagoon)] focus:outline-none"
        />
      </div>

      {isError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          Failed to load candidates. Please try again.
        </div>
      )}

      {isPending && (
        <div className="island-shell space-y-3 rounded-2xl p-6">
          {Array.from({ length: 8 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
            <div key={i} className="h-14 animate-pulse rounded-xl bg-[var(--line)]" />
          ))}
        </div>
      )}

      {!isPending && !isError && (
        <div
          ref={tableContainerRef}
          className="island-shell overflow-auto rounded-2xl"
          style={{ maxHeight: '600px' }}
        >
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead className="sticky top-0 z-10 bg-[var(--surface-strong)]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-[var(--line)]">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[var(--sea-ink-soft)]"
                    >
                      {header.isPlaceholder ? null : (
                        <button
                          type="button"
                          className={`flex items-center gap-1 hover:text-[var(--sea-ink)] ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getIsSorted() === 'asc' && ' ↑'}
                          {header.column.getIsSorted() === 'desc' && ' ↓'}
                          {header.column.getIsSorted() === false && header.column.getCanSort() && (
                            <span className="opacity-30">↕</span>
                          )}
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {paddingTop > 0 && (
                <tr>
                  <td style={{ height: `${paddingTop}px` }} colSpan={columns.length} />
                </tr>
              )}
              {virtualItems.map((virtualRow) => {
                const row = rows[virtualRow.index]
                return (
                  <tr
                    key={row.id}
                    className="border-b border-[var(--line)] transition hover:bg-[rgba(79,184,178,0.05)]"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 align-middle">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                )
              })}
              {paddingBottom > 0 && (
                <tr>
                  <td style={{ height: `${paddingBottom}px` }} colSpan={columns.length} />
                </tr>
              )}
            </tbody>
          </table>

          {rows.length === 0 && (
            <div className="py-16 text-center text-sm text-[var(--sea-ink-soft)]">
              No candidates match your search.
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      {!isPending && !isError && (
        <div className="mt-4 flex flex-wrap gap-3">
          {Object.entries(STATUS_STYLES).map(([status, cls]) => (
            <span key={status} className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${cls}`}>
              {status}
            </span>
          ))}
        </div>
      )}
    </main>
  )
}
