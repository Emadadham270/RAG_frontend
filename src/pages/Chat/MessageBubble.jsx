import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, FileText, BookOpen } from 'lucide-react'
import { useState } from 'react'

/* ── Confidence badge ──────────────────────────────────────────────────────── */
const CONF_COLORS = {
  high:   { bg: 'rgba(34,197,94,0.15)',  border: 'rgba(34,197,94,0.35)',  text: '#86efac', label: '● High Confidence'   },
  medium: { bg: 'rgba(234,179,8,0.15)',  border: 'rgba(234,179,8,0.35)',  text: '#fde047', label: '● Medium Confidence' },
  low:    { bg: 'rgba(239,68,68,0.15)',  border: 'rgba(239,68,68,0.35)',  text: '#fca5a5', label: '● Low Confidence'     },
}

function ConfidenceBadge({ level }) {
  const c = CONF_COLORS[level] || CONF_COLORS.medium
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 999,
      fontSize: 11, fontWeight: 700, letterSpacing: 0.3,
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
    }}>
      {c.label}
    </span>
  )
}

/* ── Citations panel ───────────────────────────────────────────────────────── */
function Citations({ citations }) {
  const [open, setOpen] = useState(false)
  if (!citations || citations.length === 0) return null

  return (
    <div style={{ marginTop: 12 }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, background: 'none',
          border: 'none', cursor: 'pointer', color: '#64748b', fontSize: 12,
          fontWeight: 600, padding: 0, transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#94a3b8' }}
        onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b' }}
      >
        <BookOpen style={{ width: 13, height: 13 }} />
        {citations.length} source{citations.length > 1 ? 's' : ''}
        {open ? <ChevronUp style={{ width: 13, height: 13 }} /> : <ChevronDown style={{ width: 13, height: 13 }} />}
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}
        >
          {citations.map((c, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 8,
                padding: '8px 12px', borderRadius: 10,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <FileText style={{ width: 13, height: 13, color: '#475569', flexShrink: 0, marginTop: 1 }} />
              <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>
                <span style={{ color: '#94a3b8', fontWeight: 600 }}>{c.source || c.document || 'Unknown doc'}</span>
                {c.section && <> · {c.section}</>}
                {c.page > 0 && <> · p.{c.page}</>}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

/* ── Message bubble ────────────────────────────────────────────────────────── */
export default function MessageBubble({ msg }) {
  const isUser = msg.role === 'user'

  if (isUser) {
    return (
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}
      >
        <div style={{
          maxWidth: '72%', padding: '12px 18px',
          background: 'rgba(225,29,72,0.15)',
          border: '1px solid rgba(244,63,94,0.25)',
          borderRadius: '20px 4px 20px 20px',
          fontSize: 14, lineHeight: 1.65, color: '#e2e8f0',
        }}>
          {msg.question}
        </div>
        <div style={{
          flexShrink: 0, width: 34, height: 34, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
          background: 'rgba(244,63,94,0.15)', border: '1px solid rgba(244,63,94,0.3)',
        }}>
          👤
        </div>
      </motion.div>
    )
  }

  /* Assistant bubble */
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
    >
      <div style={{
        flexShrink: 0, width: 34, height: 34, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
        background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
      }}>
        🩺
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Status: error */}
        {msg.status === 'error' && (
          <div style={{
            padding: '12px 16px', borderRadius: '4px 20px 20px 20px',
            background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
            fontSize: 14, color: '#fca5a5', lineHeight: 1.65,
          }}>
            {msg.answer}
          </div>
        )}

        {/* Status: answered */}
        {msg.status !== 'error' && (
          <div style={{
            padding: '16px 18px', borderRadius: '4px 20px 20px 20px',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {/* Recommendation */}
            <p style={{ fontSize: 14, color: '#e2e8f0', lineHeight: 1.75, margin: 0, marginBottom: 10 }}>
              {msg.answer}
            </p>

            {/* Evidence */}
            {msg.evidence && (
              <div style={{
                marginBottom: 10, padding: '10px 14px', borderRadius: 10,
                background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.15)',
                fontSize: 13, color: '#94a3b8', lineHeight: 1.6,
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Evidence
                </span>
                {msg.evidence}
              </div>
            )}

            {/* Confidence + Citations */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <ConfidenceBadge level={msg.confidence} />
            </div>
            <Citations citations={msg.citations} />
          </div>
        )}
      </div>
    </motion.div>
  )
}
