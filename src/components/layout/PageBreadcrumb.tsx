'use client'
import Link from 'next/link'
import { HomeOutlined, RightOutlined } from '@ant-design/icons'

interface Crumb {
  label: string
  href?: string
}

interface PageBreadcrumbProps {
  /** The full display title shown as the big h1 */
  title: string
  /** Optional subtitle shown below the title */
  subtitle?: string
  /** Breadcrumb trail — the last item is auto-derived from title */
  crumbs?: Crumb[]
}

export function PageBreadcrumb({ title, subtitle, crumbs = [] }: PageBreadcrumbProps) {
  return (
    <div className="mb-8 border-b border-white/5 pb-6">
      {/* Breadcrumb trail */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-white/40 hover:text-primary transition-colors text-xs font-semibold no-underline"
        >
          <HomeOutlined style={{ fontSize: 11 }} />
          <span>Home</span>
        </Link>
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            <RightOutlined style={{ fontSize: 8 }} className="text-white/20" />
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="text-white/40 hover:text-primary transition-colors text-xs font-semibold no-underline"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-white/60 text-xs font-semibold">{crumb.label}</span>
            )}
          </span>
        ))}
        {/* Auto last crumb = current page title */}
        <span className="flex items-center gap-2">
          <RightOutlined style={{ fontSize: 8 }} className="text-white/20" />
          <span className="text-primary text-xs font-bold">{title}</span>
        </span>
      </div>

      {/* Page Title — left-aligned, matches logo grid */}
      <h1 className="m-0 text-white text-2xl md:text-3xl font-black tracking-tight leading-tight whitespace-nowrap">
        {title}
      </h1>
      {subtitle && (
        <p className="m-0 mt-1.5 text-white/40 text-sm font-medium whitespace-nowrap">{subtitle}</p>
      )}
    </div>
  )
}
