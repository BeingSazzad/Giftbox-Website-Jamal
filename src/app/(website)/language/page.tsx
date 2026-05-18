'use client';
import { CheckOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { WebShell } from '@/components/layout/WebShell'
import { BackHeader } from '@/components/layout/BackHeader'

interface Language {
  code: 'en' | 'fr'
  label: string
  sub: string
  flag: string
}

const languages: Language[] = [
  { code: 'en', label: 'English', sub: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', sub: 'French', flag: '🇫🇷' },
]

export default function LanguagePage() {
  const [selected, setSelected] = useState<Language['code']>('en')

  return (
    <WebShell maxWidth={560}>
      <BackHeader title="Language" />

      <div className="bg-surface/60 border border-white/6 rounded-2xl overflow-hidden">
        {languages.map((lang, i) => {
          const isSelected = lang.code === selected
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setSelected(lang.code)}
              className={[
                'w-full px-5 py-4 border-0 text-white flex items-center gap-3.5 cursor-pointer text-left transition-colors duration-200',
                isSelected ? 'bg-primary/6' : 'bg-transparent',
                i !== 0 ? 'border-t border-white/4' : '',
              ].join(' ')}
            >
              <span className="text-3xl">{lang.flag}</span>
              <div className="flex-1 min-w-0">
                <div className="text-white text-base font-bold">{lang.label}</div>
                <div className="text-white/55 text-[13px] mt-0.5">{lang.sub}</div>
              </div>
              {isSelected && (
                <span className="w-7 h-7 rounded-full gradient-brand flex items-center justify-center text-[#1a0f0a]">
                  <CheckOutlined style={{ fontSize: 14 }} className="font-bold" />
                </span>
              )}
            </button>
          )
        })}
      </div>
    </WebShell>
  )
}
