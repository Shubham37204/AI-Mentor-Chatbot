import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="h-12 border-b flex items-center justify-between px-4 bg-white">
      <span className="font-semibold text-sm">DSA Coach AI</span>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{user?.username}</span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </div>
  )
}
