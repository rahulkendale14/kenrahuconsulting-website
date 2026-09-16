export function SPCard({ children, className = '' }) {
  return (
    <div className={`bg-surface border border-[#2A2A2A] rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  )
}
