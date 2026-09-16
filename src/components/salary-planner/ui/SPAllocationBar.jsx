import { pct } from '@/lib/salaryEngine'

const SEGMENTS = [
  { key: 'fixedObligations', label: 'Bills & EMI',   color: 'bg-rose-500' },
  { key: 'household',        label: 'Household',      color: 'bg-orange-500' },
  { key: 'medical',          label: 'Medical',        color: 'bg-yellow-500' },
  { key: 'irregular',        label: 'Irregular',      color: 'bg-lime-500' },
  { key: 'savings',          label: 'Savings',        color: 'bg-emerald-500' },
  { key: 'buffer',           label: 'Buffer',         color: 'bg-sky-500' },
  { key: 'flexible',         label: 'Flexible',       color: 'bg-indigo-400' },
]

export function SPAllocationBar({ allocation, salary }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-5 rounded-full overflow-hidden gap-0.5">
        {SEGMENTS.map(seg => {
          const width = pct(allocation[seg.key], salary)
          if (width <= 0) return null
          return (
            <div
              key={seg.key}
              className={`${seg.color} transition-all duration-300`}
              style={{ width: `${width}%` }}
              title={`${seg.label}: ${width}%`}
            />
          )
        })}
      </div>
      <div className="grid grid-cols-2 gap-y-1.5 gap-x-3">
        {SEGMENTS.map(seg => {
          const share = pct(allocation[seg.key], salary)
          if (share <= 0) return null
          return (
            <div key={seg.key} className="flex items-center gap-1.5 text-xs text-muted">
              <div className={`w-2.5 h-2.5 rounded-sm flex-shrink-0 ${seg.color}`} />
              <span className="truncate">{seg.label}</span>
              <span className="ml-auto font-medium text-white">{share}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
