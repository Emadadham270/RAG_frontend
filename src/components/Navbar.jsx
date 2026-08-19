import { Heart } from 'lucide-react'

const NAV_LINKS = ['Home', 'Features', 'Ask Now']

export default function Navbar() {
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: 36 }}>
        {NAV_LINKS.map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase().replace(' ', '-')}`}
            style={{ fontSize: 14, color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#f8fafc' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8' }}
          >
            {label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#ask-now"
        style={{
          padding: '9px 22px', borderRadius: 999, fontSize: 14, fontWeight: 600,
          background: '#e11d48', color: '#fff', textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(225,29,72,0.35)',
          transition: 'all 0.2s',
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
      </a>
    </nav>
  )
}
