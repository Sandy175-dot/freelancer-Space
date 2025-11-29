import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import CornerButton from '../UI/CornerButton';

const HeroSection = () => {
  const particlesRef = useRef(null);

  useEffect(() => {
    // GSAP particle animation
    const particles = particlesRef.current;
    if (particles) {
      // Create floating particles
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-[#00c6ff] rounded-full opacity-30';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particles.appendChild(particle);

        // Animate particles
        gsap.to(particle, {
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
          duration: Math.random() * 10 + 5,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut'
        });
      }
    }
  }, []);



  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/background-video.mp4.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-[#0d0f17]/70"></div>
      </div>

      {/* Particles */}
      <div ref={particlesRef} className="absolute inset-0 z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="revalia-regular text-5xl md:text-7xl font-extrabold leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300 drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            Hire the best freelancers for any job, online.
          </motion.h1>

          <ul className="mt-8 space-y-4 text-lg text-gray-200 bbh-sans-bartle-regular">
            <li className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_10px_#ff1a75]"></span>
              World's largest freelance marketplace.
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_#00aaff]"></span>
              Any job you can possibly think of.
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_10px_#b366ff]"></span>
              Save up to 90% & get quotes for free.
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 shadow-[0_0_10px_#00ffaa]"></span>
              Pay only when you're 100% happy.
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <CornerButton to="/login?intent=hire" ariaLabel="Hire a Freelancer">
              Hire a Freelancer
            </CornerButton>
            <CornerButton to="/login?intent=work" ariaLabel="Earn Money Freelancing">
              Earn Money Freelancing
            </CornerButton>
          </div>
        </motion.div>
      </div>


    </section>
  );
};

export default HeroSection;
