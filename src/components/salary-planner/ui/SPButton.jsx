export function SPButton({ children, onClick, variant = 'primary', disabled, className = '' }) {
  const base    = 'w-full rounded-xl font-semibold text-sm transition-all duration-150 cursor-pointer min-h-[48px] px-5 py-3'
  const variants = {
    primary:   'bg-accent hover:bg-accent-dark text-white disabled:opacity-40 disabled:cursor-not-allowed',
    secondary: 'bg-transparent text-accent border border-accent/40 hover:border-accent hover:bg-accent/5',
    ghost:     'text-muted hover:text-white',
  }
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}
