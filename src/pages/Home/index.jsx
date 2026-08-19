import Navbar from '@/components/Navbar'
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'
import ChatSection from './ChatSection'
import Footer from './Footer'

export default function Home() {
  return (
    <div style={{ background: '#0a0a0f', color: '#f8fafc', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
      />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ChatSection />
      <Footer />
    </div>
  )
}
