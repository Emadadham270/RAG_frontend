import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

function SpinnerFallback() {
  return (
    <div style={{
      width: '100%', height: '100%', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: '2px solid rgba(244,63,94,0.2)',
        borderTopColor: '#f43f5e',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export function SplineScene({ scene, className, style }) {
  return (
    <Suspense fallback={<SpinnerFallback />}>
      <Spline scene={scene} className={className} style={style} />
    </Suspense>
  )
}
