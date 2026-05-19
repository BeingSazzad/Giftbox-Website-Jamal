import type { ParticipationStatus } from '../../data/participations'

const STYLES: Record<ParticipationStatus, { label: string; cls: string }> = {
  pending: {
    label: 'Pending',
    cls: 'text-primary bg-[#1f150e]/95 border-primary/50 shadow-lg shadow-black/40',
  },
  approved: {
    label: 'Approved',
    cls: 'text-[#10b981] bg-[#0c1c14]/95 border-[#10b981]/50 shadow-lg shadow-black/40',
  },
  rejected: {
    label: 'Rejected',
    cls: 'text-[#ef4444] bg-[#1c0c0c]/95 border-[#ef4444]/50 shadow-lg shadow-black/40',
  },
  completed: {
    label: 'Completed',
    cls: 'text-[#06b6d4] bg-[#0c1820]/95 border-[#06b6d4]/50 shadow-lg shadow-black/40',
  },
}

interface StatusBadgeProps {
  status: ParticipationStatus
  size?: 'sm' | 'md'
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const s = STYLES[status]
  const sizeCls = size === 'md' ? 'px-3.5 py-1.5 text-[13px]' : 'px-3 py-1 text-xs'
  return (
    <span
      className={[
        'inline-block rounded-full border font-bold leading-tight backdrop-blur-md select-none',
        sizeCls,
        s.cls,
      ].join(' ')}
    >
      {s.label}
    </span>
  )
}
