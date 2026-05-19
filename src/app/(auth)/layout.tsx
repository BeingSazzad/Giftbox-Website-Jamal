export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#22124e] via-[#150a2e] to-[#0a0516]">
      {children}
    </main>
  )
}
