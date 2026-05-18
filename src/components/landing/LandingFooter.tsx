import Link from 'next/link'
import logoImg from '@/assets/logo.png'
import { GiftFilled, FacebookFilled, TwitterOutlined, InstagramOutlined, YoutubeFilled } from '@ant-design/icons'

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'How it Works', href: '#how-it-works' },
      { label: 'Prizes', href: '#prizes' },
      { label: 'Winners', href: '#winners' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact Support', href: '/support' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
]

export function LandingFooter() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0d0722] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img src={logoImg.src} alt="Logo" className="w-10 h-10 object-contain" />
            <span className="text-white font-black text-2xl tracking-tight">Gift Box</span>
          </div>
          <p className="m-0 text-white/60 text-base leading-relaxed max-w-[320px] mb-8">
            The most trusted prize-winning platform. Daily draws for premium
            gadgets, electronics, and lifestyle products.
          </p>
          
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:bg-white/10 hover:border-primary/50 transition-all"><FacebookFilled className="text-lg" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:bg-white/10 hover:border-primary/50 transition-all"><TwitterOutlined className="text-lg" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:bg-white/10 hover:border-primary/50 transition-all"><InstagramOutlined className="text-lg" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:bg-white/10 hover:border-primary/50 transition-all"><YoutubeFilled className="text-lg" /></a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="m-0 mb-6 text-white text-sm font-bold tracking-widest uppercase">
              {col.title}
            </h4>
            <ul className="m-0 p-0 list-none flex flex-col gap-4">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith('#') ? (
                    <a href={l.href} className="text-white/60 no-underline text-base hover:text-primary transition-colors">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="text-white/60 no-underline text-base hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white/50 text-sm">
          © {new Date().getFullYear()} Gift Box. All rights reserved.
        </div>
        <div className="flex items-center gap-6 text-white/40 text-sm">
          <span>Made with ❤️ for everyone.</span>
        </div>
      </div>
    </footer>
  )
}
