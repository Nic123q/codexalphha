import { useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import HeroSection from '@/components/hero-section';
import GameSection from '@/components/game-section';
import UpcomingGames from '@/components/upcoming-games';
import GamingSetup from '@/components/gaming-setup';
import CommentSection from '@/components/comment-section';
import ContactForm from '@/components/contact-form';

// Add Font Awesome script for icons
const loadFontAwesome = () => {
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js';
  script.crossOrigin = 'anonymous';
  script.defer = true;
  document.head.appendChild(script);
};

const Home = () => {
  useEffect(() => {
    loadFontAwesome();
    
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = (target as HTMLAnchorElement).getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          
          const targetElement = document.querySelector(href);
          if (targetElement) {
            window.scrollTo({
              top: (targetElement as HTMLElement).offsetTop - 80,
              behavior: 'smooth'
            });
          }
        }
      }
    };
    
    document.body.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.body.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <GameSection />
        <UpcomingGames />
        <GamingSetup />
        <CommentSection />
        <ContactForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
