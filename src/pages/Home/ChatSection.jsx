import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send } from 'lucide-react'

const SUGGESTED = [
  'What is a normal blood pressure reading?',
  'What causes high blood pressure?',
  'How can I lower BP without medication?',
  'Which symptoms need emergency care?',
  'Does stress raise blood pressure?',
  'What foods should I avoid with hypertension?',
]

const INITIAL_MSG = {
  role: 'assistant',
  text: "👋 Hey! I'm an AI specialized in answering your blood pressure & hypertension questions. Ask me anything.",
}

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center', padding: '4px 0' }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{ width: 7, height: 7, borderRadius: '50%', background: '#fb7185' }}
          animate={{ y: [0, -7, 0] }}
          transition={{ repeat: Infinity, delay: i * 0.18, duration: 0.65 }}
        />
      ))}
    </div>
  )
}

function ChatBubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex', flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start', gap: 12,
      }}
    >
      <div style={{
        flexShrink: 0, width: 34, height: 34, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
        background: isUser ? 'rgba(244,63,94,0.15)' : 'rgba(99,102,241,0.15)',
        border: `1px solid ${isUser ? 'rgba(244,63,94,0.3)' : 'rgba(99,102,241,0.3)'}`,
      }}>
        {isUser ? '👤' : '🩺'}
      </div>
      <div style={{
        maxWidth: '78%', padding: '10px 16px', fontSize: 14, lineHeight: 1.6, color: '#e2e8f0',
        borderRadius: isUser ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
        background: isUser ? 'rgba(244,63,94,0.15)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${isUser ? 'rgba(244,63,94,0.2)' : 'rgba(255,255,255,0.08)'}`,
      }}>
        {msg.text}
      </div>
    </motion.div>
  )
}

export default function ChatSection() {
  const [query, setQuery] = useState('')
  const [messages, setMessages] = useState([INITIAL_MSG])
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  const handleSend = (text) => {
    const q = (text || query).trim()
    if (!q) return
    setMessages((prev) => [...prev, { role: 'user', text: q }])
    setQuery('')
    setLoading(true)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: '🩺 Great question! This will be wired to the RAG backend to deliver source-cited, medically accurate answers.' },
      ])
      setLoading(false)
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 1300)
  }

  return (
    <section id="ask-now" style={{ padding: '100px 72px', background: '#0a0a0f' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16,
            padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
            background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.22)',
            color: '#fb7185',
          }}>
            <MessageSquare style={{ width: 13, height: 13 }} />
            Ask Now
          </span>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: '#f8fafc', marginBottom: 12, letterSpacing: '-1px' }}>
            Ask About Your Blood Pressure
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>
            Get scientifically accurate answers backed by the latest medical research
          </p>
        </motion.div>

        {/* Suggested pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
          {SUGGESTED.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              style={{
                padding: '8px 16px', fontSize: 13, borderRadius: 999, cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)',
                color: '#cbd5e1', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(244,63,94,0.4)'
                e.currentTarget.style.color = '#fb7185'
                e.currentTarget.style.background = 'rgba(244,63,94,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = '#cbd5e1'
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat window */}
        <div style={{
          borderRadius: 24, overflow: 'hidden',
          background: 'rgba(15,15,26,0.75)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
        }}>
          {/* Messages */}
          <div style={{ height: 340, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {messages.map((msg, i) => <ChatBubble key={i} msg={msg} />)}
            <AnimatePresence>
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
                >
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
                    background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
                  }}>🩺</div>
                  <div style={{
                    padding: '12px 18px', borderRadius: '4px 18px 18px 18px',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '0 20px 20px' }}>
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '6px 6px 6px 16px', borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                transition: 'border-color 0.2s',
              }}
              onFocusCapture={(e) => { e.currentTarget.style.borderColor = 'rgba(244,63,94,0.4)' }}
              onBlurCapture={(e)  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question here..."
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  fontSize: 14, color: '#e2e8f0', caretColor: '#f43f5e',
                }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!query.trim() || loading}
                style={{
                  padding: '9px 14px', borderRadius: 10, border: 'none',
                  background: !query.trim() || loading ? 'rgba(244,63,94,0.3)' : '#e11d48',
                  cursor: !query.trim() || loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => { if (query.trim() && !loading) e.currentTarget.style.background = '#f43f5e' }}
                onMouseLeave={(e) => { if (query.trim() && !loading) e.currentTarget.style.background = '#e11d48' }}
              >
                <Send style={{ width: 16, height: 16, color: '#fff' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
