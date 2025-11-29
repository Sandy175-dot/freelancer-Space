import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Star } from 'lucide-react';

const GlobalNetworkSection = () => {
  const ref = useRef(null);
  const mapRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && mapRef.current) {
      // Animate connection nodes
      const nodes = mapRef.current.querySelectorAll('.connection-node');
      gsap.fromTo(nodes, 
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2,
          ease: "back.out(1.7)"
        }
      );

      // Animate connection lines
      const lines = mapRef.current.querySelectorAll('.connection-line');
      gsap.fromTo(lines,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 0.3,
          duration: 1.5,
          stagger: 0.3,
          delay: 0.5,
          ease: "power2.out"
        }
      );
    }
  }, [isInView]);

  const features = [
    {
      title: 'Post your job',
      description: "It's free and easy! Get lots of competitive bids that suit your budget in minutes. Start making your dreams reality."
    },
    {
      title: 'Choose freelancers',
      description: "No job is too big or complex. We've got freelancers for jobs of any size or budget, across 2700+ skills. Let our talent bring your ideas to life."
    },
    {
      title: 'Pay safely',
      description: "Only pay for work when you are 100% satisfied with the outcome. Our milestone payment system protects you every step of the way."
    },
    {
      title: "We're here to help",
      description: "Your time is precious. Let our team of expert recruiters and co-pilots save you time finding talent, even managing your job if needed."
    }
  ];

  const freelancerCards = [
    { id: 1, image: 'https://randomuser.me/api/portraits/women/1.jpg', rating: 5 },
    { id: 2, image: 'https://randomuser.me/api/portraits/men/2.jpg', rating: 5 },
    { id: 3, image: 'https://randomuser.me/api/portraits/women/3.jpg', rating: 5 },
    { id: 4, image: 'https://randomuser.me/api/portraits/men/4.jpg', rating: 5 },
    { id: 5, image: 'https://randomuser.me/api/portraits/women/5.jpg', rating: 5 },
    { id: 6, image: 'https://randomuser.me/api/portraits/men/6.jpg', rating: 5 }
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/957040/night-photograph-starry-sky-night-sky-star-957040.jpeg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Animated World Map Background */}
      <div ref={mapRef} className="absolute inset-0 z-10 opacity-10">
        <svg viewBox="0 0 1200 600" className="w-full h-full">
          {/* Connection Lines */}
          <line x1="200" y1="150" x2="400" y2="200" className="connection-line stroke-blue-400 stroke-1" />
          <line x1="400" y1="200" x2="600" y2="180" className="connection-line stroke-blue-400 stroke-1" />
          <line x1="600" y1="180" x2="800" y2="220" className="connection-line stroke-blue-400 stroke-1" />
          <line x1="800" y1="220" x2="1000" y2="160" className="connection-line stroke-blue-400 stroke-1" />
          <line x1="300" y1="350" x2="500" y2="400" className="connection-line stroke-blue-400 stroke-1" />
          <line x1="500" y1="400" x2="700" y2="380" className="connection-line stroke-blue-400 stroke-1" />
          
          {/* Connection Nodes */}
          <circle cx="200" cy="150" r="4" className="connection-node fill-pink-500" />
          <circle cx="400" cy="200" r="4" className="connection-node fill-blue-400" />
          <circle cx="600" cy="180" r="4" className="connection-node fill-pink-500" />
          <circle cx="800" cy="220" r="4" className="connection-node fill-blue-400" />
          <circle cx="1000" cy="160" r="4" className="connection-node fill-pink-500" />
          <circle cx="300" cy="350" r="4" className="connection-node fill-blue-400" />
          <circle cx="500" cy="400" r="4" className="connection-node fill-pink-500" />
          <circle cx="700" cy="380" r="4" className="connection-node fill-blue-400" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Tap into a{' '}
              <span className="text-pink-500">global talent network</span>
            </h2>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <h3 className="text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Freelancer Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {freelancerCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={card.image} 
                      alt="Freelancer" 
                      className="w-12 h-12 rounded-full border-2 border-pink-500"
                    />
                    <div className="flex-1">
                      <div className="h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(card.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-pink-500 text-pink-500" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GlobalNetworkSection;