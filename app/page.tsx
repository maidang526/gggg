import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CampaignSection from './components/CampaignSection';
import NewsSection from './components/NewsSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CampaignSection />
      <NewsSection />
      <Footer />
    </main>
  );
}
