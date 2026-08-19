import { motion } from 'framer-motion'

export default function StatCard({ icon: Icon, value, label, iconBg }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        padding: '16px 10px', borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(8px)',
        cursor: 'default',
      }}
    >
      <div style={{ padding: 10, borderRadius: 12, background: iconBg }}>
        <Icon style={{ width: 18, height: 18, color: '#fff' }} />
      </div>
      <span style={{ fontSize: 22, fontWeight: 800, color: '#f8fafc' }}>{value}</span>
      <span style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', lineHeight: 1.4 }}>{label}</span>
    </motion.div>
  )
}
