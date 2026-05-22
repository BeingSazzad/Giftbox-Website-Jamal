import { BellOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

interface MobileHomeHeaderProps {
  userName?: string
  avatar?: string
  greeting?: string
  hasNotifications?: boolean
}

export function MobileHomeHeader({
  userName: propUserName,
  avatar = 'https://i.pravatar.cc/200?img=12',
  greeting = 'Welcome to Weekly Prize Draw',
  hasNotifications = true,
}: MobileHomeHeaderProps) {
  const router = useRouter()
  const { user, logout } = useAuth()
  
  const userName = propUserName || user?.name || 'Sazzad'

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'edit',
      label: <Link href="/profile?tab=profile" className="text-white/80 hover:text-white font-medium">Edit Profile</Link>,
    },
    {
      key: 'password',
      label: <Link href="/profile?tab=password" className="text-white/80 hover:text-white font-medium">Change Password</Link>,
    },
    {
      type: 'divider',
      className: 'bg-white/10'
    },
    {
      key: 'language',
      label: <Link href="/profile?tab=preferences" className="text-white/80 hover:text-white font-medium">Preferences</Link>,
    },
    {
      key: 'support',
      label: <Link href="/profile?tab=support" className="text-white/80 hover:text-white font-medium">Help & Support</Link>,
    },
    {
      type: 'divider',
      className: 'bg-white/10'
    },
    {
      key: 'logout',
      danger: true,
      label: (
        <div 
          onClick={() => {
            logout()
            router.push('/login')
          }} 
          className="font-bold text-danger w-full cursor-pointer"
        >
          Sign Out
        </div>
      ),
    },
  ]

  return (
    <header className="md:hidden px-4 pt-5 pb-2 flex items-center gap-3">
      <Dropdown 
        menu={{ items: userMenuItems }} 
        trigger={['click']} 
        placement="bottomLeft"
        classNames={{ root: "custom-dropdown-dark" }}
      >
        <div className="flex items-center gap-3 cursor-pointer flex-1 min-w-0">
          <div className="w-12 h-12 min-w-12 rounded-full bg-gradient-to-tr from-primary to-[#ff8c00] p-0.5 shadow-lg shadow-primary/20">
            <img
              src={avatar}
              alt={userName}
              className="w-full h-full rounded-full object-cover border-2 border-[#0a0514]"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-[17px] font-bold leading-tight">
              Hello, {userName} <span aria-hidden>👋</span>
            </div>
            <div className="text-white/40 text-xs mt-0.5 truncate">{greeting}</div>
          </div>
        </div>
      </Dropdown>
      <button
        type="button"
        aria-label="Notifications"
        className="relative w-11 h-11 min-w-11 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center cursor-pointer transition-all duration-200"
      >
        <BellOutlined style={{ fontSize: 18 }} />
        {hasNotifications && (
          <span className="absolute top-2.5 right-3 w-2 h-2 rounded-full bg-[#FF3B30] border border-[#0a0514]" />
        )}
      </button>
    </header>
  )
}
