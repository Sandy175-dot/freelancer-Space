import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import StarField from '../Background/StarField';

const MakeItRealSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      title: 'The best talent',
      description: 'Discover reliable professionals by exploring their portfolios and immersing yourself in the feedback shared on their profiles.'
    },
    {
      title: 'Fast bids',
      description: 'Get quick, no-obligation quotes from skilled freelancers. 80% of jobs receive bids within 60 seconds. Your idea is just moments from reality.'
    },
    {
      title: 'Quality work',
      description: 'With Freelancer\'s talent pool of over 85.2 million professionals at your fingertips, you\'ll find quality talent to get what you need done.'
    },
    {
      title: 'Be in control',
      description: 'Stay in the loop while on the move. Chat with your freelancers and get real time updates with our mobile app. Anytime, anywhere.'
    }
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden bg-gradient-to-b from-[#1B2735] to-[#090A0F]">
      {/* Star Field Animation */}
      <div className="absolute inset-0 z-0">
        <StarField />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              <span className="text-[#ff007f]">Make it real</span>
              <br />
              <span className="text-white">with Freelancer</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="space-y-3"
                >
                  <h3 className="text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-[#ffffffcc] leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Empty space for background symbol */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
};

export default MakeItRealSection;