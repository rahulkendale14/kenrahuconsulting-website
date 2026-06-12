export function SPInputField({ label, name, value, onChange, prefix = '₹', placeholder = '0', error, hint }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-white/90">
        {label}
      </label>
      {hint && <p className="text-xs text-muted -mt-0.5">{hint}</p>}
      <div className={`flex items-center border rounded-xl px-3 h-12 bg-bg transition-colors ${
        error ? 'border-red-500/60 bg-red-900/10' : 'border-[#2A2A2A] focus-within:border-accent/60'
      }`}>
        {prefix && <span className="text-muted mr-1.5 text-sm select-none">{prefix}</span>}
        <input
          id={name}
          type="number"
          inputMode="numeric"
          min="0"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 outline-none text-white text-base bg-transparent placeholder:text-muted/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}
