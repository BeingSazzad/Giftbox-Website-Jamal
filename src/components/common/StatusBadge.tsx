import type { ParticipationStatus } from '../../data/participations'

const STYLES: Record<ParticipationStatus, { label: string; cls: string }> = {
  pending: {
    label: 'Pending',
    cls: 'text-primary bg-primary/12 border-primary/40',
  },
  approved: {
    label: 'Approved',
    cls: 'text-success bg-success/12 border-success/40',
  },
  rejected: {
    label: 'Rejected',
    cls: 'text-danger bg-danger/12 border-danger/40',
  },
  completed: {
    label: 'Completed',
    cls: 'text-sky-400 bg-sky-400/12 border-sky-400/40',
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
        'inline-block rounded-full border font-semibold leading-tight',
        sizeCls,
        s.cls,
      ].join(' ')}
    >
      {s.label}
    </span>
  )
}
