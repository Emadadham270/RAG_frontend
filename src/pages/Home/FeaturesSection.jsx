import { motion } from 'framer-motion'
import { Brain, ShieldCheck, Zap, Activity, AlertCircle, BookOpen } from 'lucide-react'
import FeatureCard from '@/components/FeatureCard'

const FEATURES = [
  {
    icon: Brain,
    title: 'Advanced RAG Technology',
    description: 'Retrieves from trusted medical sources and generates contextually precise, source-cited answers — not guesses.',
  },
  {
    icon: ShieldCheck,
    title: 'Clinically Reliable',
    description: 'Every answer is grounded in verified medical literature and cross-checked against cardiology guidelines.',
  },
  {
    icon: Zap,
    title: 'Instant Responses',
    description: 'Get answers in under 2 seconds, available 24/7 — whenever your question comes up.',
  },
  {
    icon: Activity,
    title: 'Track Your Readings',
    description: 'Log your blood pressure over time and understand your personal patterns with clear insights.',
  },
  {
    icon: AlertCircle,
    title: 'Emergency Alerts',
    description: 'Detects critical warning symptoms and immediately guides you to seek urgent medical care.',
  },
  {
    icon: BookOpen,
    title: 'Health Education',
    description: 'Learn about diet, lifestyle, and stress management backed by up-to-date scientific evidence.',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" style={{ background: '#0a0a0f', paddingBottom: 100 }}>
      {/* Top fade from hero */}
      <div style={{
        height: 1,
        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)',
        marginBottom: 0,
      }} />

      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '80px 72px 0' }}>

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 60 }}
        >
          {/* Pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
            background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.22)',
            color: '#fb7185', marginBottom: 20,
          }}>
            <Brain style={{ width: 13, height: 13 }} />
            Why da8tak kam?
          </div>

          {/* Title + subtitle side by side */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40 }}>
            <h2 style={{
              fontSize: 42, fontWeight: 800, color: '#f8fafc',
              letterSpacing: '-1px', lineHeight: 1.1, maxWidth: 440,
            }}>
              Everything you need to understand your pressure
            </h2>
            <p style={{
              fontSize: 15, color: '#64748b', lineHeight: 1.7,
              maxWidth: 340, flexShrink: 0, paddingBottom: 4,
            }}>
              Cutting-edge AI combined with curated medical knowledge
              bases — so every answer is one you can trust.
            </p>
          </div>
        </motion.div>

        {/* 3-column feature grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 0.09} />
          ))}
        </div>
      </div>
    </section>
  )
}
