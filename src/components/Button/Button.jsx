function Button({ onClick, children, variant = 'primary', className = '' }) {
  const base =
    'px-6 py-2.5 text-sm font-medium transition-colors duration-150 cursor-pointer'
  const variants = {
    primary: 'bg-neutral-900 text-white hover:bg-neutral-700',
    secondary: 'border border-neutral-300 text-neutral-700 hover:bg-neutral-50',
    ghost: 'text-neutral-500 hover:text-neutral-800 underline underline-offset-2',
  }
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

export default Button
