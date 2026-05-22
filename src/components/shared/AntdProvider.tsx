'use client'
import { ConfigProvider, theme, App } from 'antd'
import type { ReactNode } from 'react'

export function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#FE9301',
          colorInfo: '#FE9301',
          colorLink: 'rgba(255,255,255,0.7)',
          colorLinkHover: '#ffffff',
          colorLinkActive: 'rgba(255,255,255,0.7)',
          colorBgBase: '#1a0f3d',
          colorBgContainer: '#1f1545',
          colorBgElevated: '#2a1854',
          colorBorder: '#2a2a35',
          colorText: '#e5e7eb',
          colorTextHeading: '#ffffff',
          borderRadius: 8,
          fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        },
        components: {
          Button: {
            colorPrimaryHover: '#FFB900',
            colorTextLightSolid: '#1a0f0a',
          },
        },
      }}
    >
      <App>
        {children}
      </App>
    </ConfigProvider>
  )
}
