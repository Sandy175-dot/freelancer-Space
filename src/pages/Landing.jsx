import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Landing/Navigation';
import HeroSection from '../components/Landing/HeroSection';
import MakeItRealSection from '../components/Landing/MakeItRealSection';
import GlobalNetworkSection from '../components/Landing/GlobalNetworkSection';
import CategorySection from '../components/Landing/CategorySection';
import Footer from '../components/Landing/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  useEffect(() => {
    // Smooth scrolling animations
    gsap.utils.toArray('section').forEach((section, index) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Parallax effect for hero background
    gsap.to('.hero-bg', {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: '.hero-section',
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0f17] text-[#ffffffcc] overflow-x-hidden">
      <Navigation />
      <main>
        <div className="hero-section">
          <HeroSection />
        </div>
        
        <MakeItRealSection />
        <CategorySection />
        <GlobalNetworkSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Landing;