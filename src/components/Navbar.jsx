import { Heart, MessageSquare, LogIn } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const NAV_LINKS = [
  { label: 'Home',     href: '#home'     },
  { label: 'Features', href: '#features' },
  { label: 'Ask Now',  href: '#ask-now'  },
]

export default function Navbar() {
  const { token } = useAuth()
  const navigate  = useNavigate()

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 40px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(10,10,15,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <div
          style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'linear-gradient(135deg,#f43f5e,#dc2626)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 18px rgba(244,63,94,0.5)',
            animation: 'heartbeat 1.4s ease-in-out infinite',
          }}
        >
          <Heart style={{ width: 17, height: 17, color: '#fff', fill: '#fff' }} />
        </div>
        <span style={{ fontSize: 18, fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.3px' }}>
          da8tak kam?
        </span>
      </Link>

      {/* Links */}
      <div style={{ display: 'flex', gap: 36 }}>
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            style={{ fontSize: 14, color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#f8fafc' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8' }}
          >
            {label}
          </a>
        ))}
      </div>

      {/* CTA — auth-aware */}
      {token ? (
        <button
          onClick={() => navigate('/chat')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '9px 22px', borderRadius: 999, fontSize: 14, fontWeight: 600,
            background: '#e11d48', color: '#fff', border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(225,29,72,0.35)', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f43f5e'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#e11d48'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <MessageSquare style={{ width: 15, height: 15 }} />
          Open Chat
        </button>
      ) : (
        <div style={{ display: 'flex', gap: 10 }}>
          <Link
            to="/login"
            style={{
              padding: '9px 18px', borderRadius: 999, fontSize: 14, fontWeight: 600,
              color: '#94a3b8', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: 6,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#f8fafc'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          >
            <LogIn style={{ width: 14, height: 14 }} />
            Sign In
          </Link>
          <Link
            to="/register"
            style={{
              padding: '9px 22px', borderRadius: 999, fontSize: 14, fontWeight: 600,
              background: '#e11d48', color: '#fff', textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(225,29,72,0.35)', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f43f5e'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#e11d48'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  )
}
