import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className = '' }: Props) {
  return (
    <div className={`glass-card rounded-2xl p-6 md:p-8 ${className}`}>
      {children}
    </div>
  )
}
