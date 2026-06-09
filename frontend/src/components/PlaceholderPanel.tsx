type PlaceholderPanelProps = {
  children: string
}

export function PlaceholderPanel({ children }: PlaceholderPanelProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
      {children}
    </div>
  )
}
