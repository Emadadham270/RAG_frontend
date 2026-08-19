import { motion } from 'framer-motion'

export default function FeatureCard({ icon: Icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -6 }}
      style={{
        position: 'relative', padding: 24, borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden', cursor: 'default',
        transition: 'border-color 0.3s',
      }}
      onHoverStart={(e) => { e.currentTarget.style.borderColor = 'rgba(244,63,94,0.3)' }}
      onHoverEnd={(e)   => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
    >
      {/* Hover glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(135deg,rgba(244,63,94,0.07) 0%,transparent 60%)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            width: 48, height: 48, borderRadius: 14, marginBottom: 16,
            background: 'linear-gradient(135deg,rgba(244,63,94,0.2),rgba(220,38,38,0.12))',
            border: '1px solid rgba(244,63,94,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Icon style={{ width: 22, height: 22, color: '#fb7185' }} />
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>{title}</h3>
        <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.65 }}>{description}</p>
      </div>
    </motion.div>
  )
}
