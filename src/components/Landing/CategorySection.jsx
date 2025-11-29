import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import WebGLBackground from '../Background/WebGLBackground';

const CategorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    'Website Design', 'Mobile Apps', 'Python', 'Logo Design', 
    'Data Entry', 'Marketing', 'WordPress', 'React', 
    'Graphic Design', 'Content Writing', 'SEO', 'Video Editing',
    'Photography', 'Translation', 'Virtual Assistant', 'Accounting',
    'Social Media', 'E-commerce', 'Animation', 'Copywriting'
  ];

  return (
    <section ref={ref} className="relative py-20 bg-gradient-to-b from-[#0d0f17] to-[#1a1d29] overflow-hidden">
      <WebGLBackground className="pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Get work done in over 2700 different categories
          </h2>
          <p className="text-[#ffffffcc] text-lg max-w-2xl mx-auto">
            From web development to creative design, find the perfect freelancer for any project
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group"
            >
              <button className="w-full text-left p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ff007f]/50 rounded-xl transition-all duration-300 group-hover:shadow-lg">
                <span className="text-[#ffffffcc] group-hover:text-white font-medium transition-colors">
                  {category}
                </span>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 text-[#ff007f] hover:text-white font-semibold text-lg group transition-colors"
          >
            <span>View more</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;