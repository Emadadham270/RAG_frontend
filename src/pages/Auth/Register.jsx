import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Mail, Lock, User, UserPlus, AlertCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate      = useNavigate()

  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setLoading(true)
    try {
      await register(name, email, password)
      navigate('/chat')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px 11px 42px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 12, color: '#e2e8f0', fontSize: 14,
    outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0f',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '24px',
    }}>
      {/* Ambient glows */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '20%', right: '15%',
          width: 480, height: 480,
          background: 'radial-gradient(circle, rgba(220,38,38,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', left: '10%',
          width: 380, height: 380,
          background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }} />
      </div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          width: '100%', maxWidth: 420,
          background: 'rgba(15,15,26,0.85)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24, padding: '44px 40px',
          backdropFilter: 'blur(24px)',
          position: 'relative', zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg,#f43f5e,#dc2626)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 18px rgba(244,63,94,0.5)',
            animation: 'heartbeat 1.4s ease-in-out infinite',
          }}>
            <Heart style={{ width: 17, height: 17, color: '#fff', fill: '#fff' }} />
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.3px' }}>
            da8tak kam?
          </span>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#f8fafc', marginBottom: 6, letterSpacing: '-0.5px' }}>
          Create your account
        </h1>
        <p style={{ fontSize: 14, color: '#64748b', marginBottom: 32 }}>
          Get instant, research-backed answers to all your blood pressure questions
        </p>

        {error && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 14px', borderRadius: 10, marginBottom: 20,
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
              color: '#fca5a5', fontSize: 13,
            }}
          >
            <AlertCircle style={{ width: 15, height: 15, flexShrink: 0 }} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 6 }}>
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <User style={{
                position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                width: 16, height: 16, color: '#475569',
              }} />
              <input
                id="reg-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(244,63,94,0.5)' }}
                onBlur={(e)  => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail style={{
                position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                width: 16, height: 16, color: '#475569',
              }} />
              <input
                id="reg-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(244,63,94,0.5)' }}
                onBlur={(e)  => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 6 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock style={{
                position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                width: 16, height: 16, color: '#475569',
              }} />
              <input
                id="reg-password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = 'rgba(244,63,94,0.5)' }}
                onBlur={(e)  => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
              />
            </div>
          </div>

          <button
            id="reg-submit"
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '13px',
              background: loading ? 'rgba(225,29,72,0.5)' : '#e11d48',
              color: '#fff', fontWeight: 700, fontSize: 15,
              border: 'none', borderRadius: 12, cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              boxShadow: loading ? 'none' : '0 8px 28px rgba(225,29,72,0.35)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#f43f5e' }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = '#e11d48' }}
          >
            {loading ? (
              <span style={{ opacity: 0.7 }}>Creating account…</span>
            ) : (
              <><UserPlus style={{ width: 16, height: 16 }} /> Create Account</>
            )}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#475569' }}>
          Already have an account?{' '}
          <Link
            to="/login"
            style={{ color: '#fb7185', fontWeight: 600, textDecoration: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#f43f5e' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#fb7185' }}
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
