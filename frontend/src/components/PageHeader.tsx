type PageHeaderProps = {
  title: string
  eyebrow?: string
}

export function PageHeader({ title, eyebrow }: PageHeaderProps) {
  return (
    <header className="mb-6">
      {eyebrow ? <p className="text-sm font-medium text-slate-500">{eyebrow}</p> : null}
      <h1 className="text-2xl font-semibold text-slate-950">{title}</h1>
    </header>
  )
}
