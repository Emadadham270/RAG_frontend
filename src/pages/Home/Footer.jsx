import { Heart, AlertCircle } from 'lucide-react'

export default function Footer() {
  return (
    <>
      {/* Disclaimer */}
      <section style={{ padding: '0 72px 64px', background: '#0a0a0f' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{
            display: 'flex', gap: 16, padding: '18px 22px', borderRadius: 18,
            border: '1px solid rgba(245,158,11,0.2)',
            background: 'rgba(245,158,11,0.04)',
          }}>
            <AlertCircle style={{ width: 20, height: 20, color: '#f59e0b', flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#fbbf24', marginBottom: 4 }}>
                Medical Disclaimer
              </p>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.65 }}>
                da8tak kam? is for educational purposes only and does not replace professional
                medical advice. In case of an emergency, call emergency services immediately
                or go to your nearest hospital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '28px 72px',
        background: '#0a0a0f',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 6 }}>
          <Heart style={{ width: 16, height: 16, color: '#e11d48', fill: '#e11d48' }} />
          <span style={{ fontSize: 15, fontWeight: 700, color: '#475569' }}>da8tak kam?</span>
        </div>
        <p style={{ fontSize: 12, color: '#334155' }}>
          AI-powered cardiovascular health support · {new Date().getFullYear()}
        </p>
      </footer>
    </>
  )
}
