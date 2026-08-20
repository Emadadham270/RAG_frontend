import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Paperclip, ArrowUp, ChevronDown, History } from 'lucide-react'
import Sidebar from './Sidebar'
import MessageBubble from './MessageBubble'
import { chatApi } from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '4px 0' }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{ width: 7, height: 7, borderRadius: '50%', background: '#0ea5e9' }}
          animate={{ y: [0, -7, 0] }}
          transition={{ repeat: Infinity, delay: i * 0.18, duration: 0.65 }}
        />
      ))}
    </div>
  )
}

function toDisplayMsg(dbMsg) {
  return { ...dbMsg, role: 'assistant' }
}

export default function Chat() {
  const { user } = useAuth()
  const [thread, setThread] = useState([])
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [initLoad, setInitLoad] = useState(true)
  const [collapsed, setCollapsed] = useState(true)
  const [language, setLanguage] = useState('auto')
  const bottomRef = useRef(null)

  useEffect(() => {
    chatApi.getHistory()
      .then((res) => {
        setHistory(res.data || [])
      })
      .catch(console.error)
      .finally(() => setInitLoad(false))
  }, [])

  const loadHistory = () => {
    // Map history to thread format
    const fullThread = []
    history.forEach(msg => {
      let overrideMsg = { ...msg };
      if (overrideMsg.status === 'error') {
        overrideMsg.answer = "I can't give instructions at this point , please ask about something related to hypertension";
        overrideMsg.status = 'answered';
      }
      fullThread.push({ role: 'user', question: overrideMsg.question })
      fullThread.push(toDisplayMsg(overrideMsg))
    })
    setThread(fullThread)
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [thread, loading])

  const handleSend = async (text) => {
    const q = (text || input).trim()
    if (!q || loading) return
    setInput('')

    setThread((prev) => [...prev, { role: 'user', question: q }])
    setLoading(true)

    try {
      const res = await chatApi.ask(q, language)
      const saved = res.data
      if (saved.status === 'error') {
        saved.answer = "I can't give instructions at this point , please ask about something related to hypertension";
        saved.status = 'answered';
      }
      setThread((prev) => [...prev, toDisplayMsg(saved)])
    } catch (err) {
      setThread((prev) => [
        ...prev,
        {
          role: 'assistant', status: 'answered',
          answer: "I can't give instructions at this point , please ask about something related to hypertension",
          confidence: 'low', citations: [],
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleNewChat = () => setThread([])

  const handleSelectMessage = (msg) => {
    setThread([
      { role: 'user', question: msg.question },
      toDisplayMsg(msg),
    ])
  }

  return (
    <div style={{
      display: 'flex', height: '100vh', overflow: 'hidden',
      background: '#0a0a0a', fontFamily: 'Inter, system-ui, sans-serif',
      color: '#f8fafc',
    }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
      />

      {/* ── Sidebar ── */}
      <Sidebar
        history={history}
        onNewChat={handleNewChat}
        onSelectMessage={handleSelectMessage}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      {/* ── Main area ── */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative',
        backgroundSize: '40px 40px',
        backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)'
      }}>

        {/* Ambient blob */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            position: 'absolute', top: '-20%',
            width: '80%', height: '80%',
            background: 'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }} />
        </div>

        {/* ── Header User Profile ── */}
        <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 10 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '4px 8px 4px 4px', borderRadius: 20,
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
            cursor: 'pointer'
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'linear-gradient(135deg,#0ea5e9,#2563eb)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: '#fff',
            }}>
              {(user?.name || 'U')[0].toUpperCase()}
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#94a3b8' }}>{user?.name?.split(' ')[0] || 'User'}</span>
            <ChevronDown style={{ width: 14, height: 14, color: '#64748b' }} />
          </div>
        </div>

        {/* ── Message thread & Empty State ── */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '32px',
          display: 'flex', flexDirection: 'column',
          position: 'relative', zIndex: 1,
        }}>
          {!initLoad && thread.length === 0 ? (
            <div style={{ margin: 'auto', width: '100%', maxWidth: 760, paddingBottom: '10vh' }}>
              <motion.div animate={{ opacity: 1, y: 0 }}>
                <h1 style={{ fontSize: 32, fontWeight: 400, color: '#f8fafc', marginBottom: 4 }}>
                  Hey! {user?.name?.split(' ')[0] || 'Raf'}
                </h1>
                <h2 style={{ fontSize: 32, fontWeight: 400, color: '#94a3b8', marginBottom: 40 }}>
                  What can I help with?
                </h2>

                <div style={{ display: 'flex', gap: 16, marginBottom: 40, justifyContent: 'center' }}>
                  <button
                    onClick={loadHistory}
                    disabled={history.length === 0}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '14px 24px', borderRadius: 16,
                      background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
                      color: history.length === 0 ? '#475569' : '#e2e8f0',
                      cursor: history.length === 0 ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s', fontSize: 14, fontWeight: 500,
                    }}
                    onMouseEnter={(e) => {
                      if (history.length > 0) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    }}
                    onMouseLeave={(e) => {
                      if (history.length > 0) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                    }}
                  >
                    <History style={{ width: 18, height: 18, color: history.length === 0 ? '#475569' : '#0ea5e9' }} />
                    {history.length === 0 ? 'No History Available' : 'View Past Conversations'}
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            <div style={{ maxWidth: 800, margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 40 }}>
              {thread.map((msg, i) => (
                <MessageBubble key={i} msg={msg} />
              ))}

              <AnimatePresence>
                {loading && (
                  <motion.div animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                      background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)',
                    }}>✨</div>
                    <div style={{
                      padding: '14px 18px', borderRadius: '4px 20px 20px 20px',
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                      <TypingDots />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* ── Input Box ── */}
        <div style={{
          position: thread.length === 0 ? 'absolute' : 'relative',
          bottom: thread.length === 0 ? '20%' : 0,
          left: 0, right: 0,
          display: 'flex', justifyContent: 'center',
          padding: '0 32px 32px',
          zIndex: 10,
        }}>
          <div style={{
            width: '100%', maxWidth: 760,
            background: 'rgba(20,20,24,0.7)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 24, overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', padding: '20px 24px', gap: 12 }}>
              <Sparkles style={{ width: 20, height: 20, color: '#e2e8f0', marginTop: 2 }} />
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value)
                  e.target.style.height = 'auto'
                  e.target.style.height = Math.min(e.target.scrollHeight, 180) + 'px'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Ask me anything......"
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  fontSize: 15, color: '#e2e8f0', resize: 'none', lineHeight: 1.5,
                  maxHeight: 180, overflowY: 'auto', fontFamily: 'Inter, system-ui, sans-serif',
                }}
                rows={1}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 14px', borderRadius: 20,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#94a3b8', fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#e2e8f0'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                >
                  <Paperclip style={{ width: 14, height: 14 }} />
                  Attach file
                </button>

                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{
                    padding: '8px 14px', borderRadius: 20,
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                    color: '#94a3b8', fontSize: 13, cursor: 'pointer', outline: 'none'
                  }}
                >
                  <option value="auto">Auto-detect Language</option>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="ar">Arabic</option>
                  <option value="de">German</option>
                </select>
              </div>

              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                style={{
                  width: 36, height: 36, borderRadius: '50%', border: 'none',
                  background: !input.trim() || loading ? 'rgba(14,165,233,0.3)' : '#0ea5e9',
                  color: !input.trim() || loading ? 'rgba(255,255,255,0.5)' : '#fff',
                  cursor: !input.trim() || loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
              >
                <ArrowUp style={{ width: 18, height: 18 }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
