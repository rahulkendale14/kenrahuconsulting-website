export function SPProgressBar({ current, total }) {
  const percentage = Math.round((current / total) * 100)
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-muted mb-1.5">
        <span>Step {current} of {total}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-1.5 bg-[#2A2A2A] rounded-full">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
