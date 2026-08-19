import { motion } from 'framer-motion'
import { Activity, Stethoscope, ChevronDown, BookOpen, CheckCircle2, Zap, ArrowRight } from 'lucide-react'
import { Spotlight } from '@/components/ui/Spotlight'
import { SplineScene } from '@/components/ui/SplineScene'
import StatCard from '@/components/StatCard'

const SPLINE_SCENE = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export default function HeroSection() {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: 700,
        display: 'flex',
        alignItems: 'stretch',
        overflow: 'hidden',
        background: '#0a0a0f',
      }}
    >
      {/* ── Ambient glows ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '15%', left: '2%',
          width: 550, height: 550,
          background: 'radial-gradient(circle, rgba(220,38,38,0.13) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '25%',
          width: 350, height: 350,
          background: 'radial-gradient(circle, rgba(244,63,94,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      {/* ── Spotlight ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Spotlight size={500} />
      </div>

      {/* ── Left: text content ── */}
      <div style={{
        flex: '0 0 50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '100px 52px 80px 72px',
        position: 'relative',
        zIndex: 2,
      }}>

        {/* RAG badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '6px 14px', borderRadius: 999, width: 'fit-content',
            fontSize: 12, fontWeight: 600,
            background: 'rgba(244,63,94,0.1)',
            border: '1px solid rgba(244,63,94,0.25)',
            color: '#fb7185', marginBottom: 24,
          }}
        >
          <Activity style={{ width: 13, height: 13 }} />
          Powered by RAG · AI-Driven Medical Answers
        </motion.div>

        {/* Page name */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{ marginBottom: 10, lineHeight: 1.0, letterSpacing: '-2px' }}
        >
          <span style={{
            display: 'block', fontSize: 82, fontWeight: 900,
            background: 'linear-gradient(to bottom, #f8fafc 40%, #cbd5e1)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            da8tak
          </span>
          <span style={{
            display: 'block', fontSize: 82, fontWeight: 900,
            background: 'linear-gradient(135deg, #fb7185 20%, #e11d48)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            kam?
          </span>
        </motion.h1>

        {/* Short tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: 11, fontWeight: 700, letterSpacing: 3,
            textTransform: 'uppercase', color: '#475569',
            marginBottom: 18,
          }}
        >
          Hypertension Q&A · Retrieval-Augmented Generation
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52 }}
          style={{
            fontSize: 17, color: '#94a3b8', lineHeight: 1.75,
            maxWidth: 400, marginBottom: 38,
          }}
        >
          Ask anything about blood pressure. Get instant,
          research-backed answers from a curated medical
          knowledge base — no appointments needed.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.64 }}
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 52 }}
        >
          <a
            href="#ask-now"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px', borderRadius: 14, textDecoration: 'none',
              background: '#e11d48', color: '#fff', fontWeight: 700, fontSize: 15,
              boxShadow: '0 8px 28px rgba(225,29,72,0.4)', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f43f5e'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 14px 36px rgba(244,63,94,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#e11d48'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(225,29,72,0.4)'
            }}
          >
            <Stethoscope style={{ width: 16, height: 16 }} />
            Ask Now
            <ArrowRight style={{ width: 14, height: 14 }} />
          </a>
          <a
            href="#features"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px', borderRadius: 14, textDecoration: 'none',
              background: 'rgba(255,255,255,0.05)', color: '#cbd5e1',
              fontWeight: 600, fontSize: 15,
              border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <ChevronDown style={{ width: 15, height: 15 }} />
            Learn More
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.78 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, maxWidth: 390 }}
        >
          <StatCard icon={BookOpen}     value="1,000+" label="Medical Sources" iconBg="rgba(244,63,94,0.18)" />
          <StatCard icon={CheckCircle2} value="99%"    label="Accuracy"        iconBg="rgba(34,197,94,0.18)" />
          <StatCard icon={Zap}          value="< 2s"   label="Response Time"   iconBg="rgba(99,102,241,0.18)" />
        </motion.div>
      </div>

      {/* ── Right: Spline 3D robot ── */}
      <div style={{
        flex: '0 0 50%',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Gradient fades to blend robot into page */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
          background: 'linear-gradient(to right, #0a0a0f 0%, transparent 20%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, #0a0a0f 0%, transparent 15%, transparent 82%, #0a0a0f 100%)',
        }} />

        {/* Spline fills the right column exactly */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <SplineScene
            scene={SPLINE_SCENE}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </div>
      </div>
    </section>
  )
}
