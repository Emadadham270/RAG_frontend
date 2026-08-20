import { motion } from 'framer-motion'
import { Home, Settings, MoreHorizontal, ArrowUpRight, ChevronRight, ChevronLeft, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Sidebar({ history, onNewChat, onSelectMessage, collapsed, onToggle }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        height: '100vh',
        background: '#0a0a0a',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'relative',
        zIndex: 20,
        overflow: 'hidden',
      }}
    >
      {/* ── Toggle Button ── */}
      <button
        onClick={onToggle}
        style={{
          position: 'absolute', top: 32, right: -12, zIndex: 30,
          width: 24, height: 24, borderRadius: '50%',
          background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.1)',
          color: '#64748b', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#f8fafc' }}
        onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b' }}
      >
        {collapsed ? <ChevronRight style={{ width: 14, height: 14 }} /> : <ChevronLeft style={{ width: 14, height: 14 }} />}
      </button>

      {/* ── Top Section ── */}
      <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', alignItems: collapsed ? 'center' : 'flex-start', paddingLeft: collapsed ? 0 : 20, paddingRight: collapsed ? 0 : 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, flexShrink: 0,
            background: '#0ea5e9',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ArrowUpRight style={{ width: 20, height: 20, color: '#fff' }} />
          </div>
          {!collapsed && (
            <span style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc' }}>
              da8tak kam?
            </span>
          )}
        </div>

        <button
          onClick={onNewChat}
          style={{
            width: collapsed ? 40 : '100%',
            height: 40,
            display: 'flex', alignItems: 'center', gap: 12,
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? 0 : '0 12px',
            borderRadius: 8, border: 'none', cursor: 'pointer',
            background: collapsed ? 'transparent' : 'rgba(14,165,233,0.1)',
            color: '#0ea5e9', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(14,165,233,0.2)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = collapsed ? 'transparent' : 'rgba(14,165,233,0.1)' }}
        >
          <Home style={{ width: 20, height: 20, flexShrink: 0 }} />
          {!collapsed && <span style={{ fontWeight: 600, fontSize: 14 }}>New Chat</span>}
        </button>
      </div>

      {/* ── History List (Only visible when expanded) ── */}
      {!collapsed && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: 1, marginTop: 12, marginBottom: 8 }}>
            Recent History
          </p>
          {history.length === 0 && (
            <p style={{ fontSize: 12, color: '#475569' }}>No past conversations.</p>
          )}
          {history.map((msg) => (
            <button
              key={msg._id}
              onClick={() => onSelectMessage(msg)}
              title={msg.question}
              style={{
                width: '100%', textAlign: 'left',
                padding: '10px 12px', borderRadius: 8,
                background: 'transparent', border: 'none',
                color: '#94a3b8', fontSize: 13, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10,
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.color = '#e2e8f0'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#94a3b8'
              }}
            >
              <MessageSquare style={{ width: 14, height: 14, flexShrink: 0, opacity: 0.7 }} />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                {msg.question}
              </span>
            </button>
          ))}
        </div>
      )}

      {collapsed && <div style={{ flex: 1 }} />}

      {/* ── Bottom Section ── */}
      <div style={{
        padding: '24px 0',
        display: 'flex', flexDirection: 'column', gap: 16,
        alignItems: collapsed ? 'center' : 'flex-start',
        paddingLeft: collapsed ? 0 : 20, paddingRight: collapsed ? 0 : 20,
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <button
          style={{
            width: collapsed ? 40 : '100%', height: 40,
            background: 'none', border: 'none', cursor: 'pointer', color: '#64748b',
            display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: 12,
            padding: collapsed ? 0 : '0 12px', borderRadius: 8, transition: 'color 0.2s, background 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'transparent'; }}
        >
          <Settings style={{ width: 20, height: 20, flexShrink: 0 }} />
          {!collapsed && <span style={{ fontSize: 14, fontWeight: 500 }}>Settings</span>}
        </button>

        <button
          onClick={handleLogout}
          style={{
            width: collapsed ? 40 : '100%', height: 40,
            background: 'none', border: 'none', cursor: 'pointer', color: '#64748b',
            display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: 12,
            padding: collapsed ? 0 : '0 12px', borderRadius: 8, transition: 'color 0.2s, background 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'transparent'; }}
        >
          <MoreHorizontal style={{ width: 20, height: 20, flexShrink: 0 }} />
          {!collapsed && <span style={{ fontSize: 14, fontWeight: 500 }}>Logout</span>}
        </button>
      </div>
    </motion.aside>
  )
}
