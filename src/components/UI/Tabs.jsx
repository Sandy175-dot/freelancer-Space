import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Tabs = ({ 
  tabs, 
  defaultTab = 0, 
  onChange,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const indicatorRef = useRef(null);
  const tabsRef = useRef([]);

  useEffect(() => {
    if (indicatorRef.current && tabsRef.current[activeTab]) {
      const activeTabElement = tabsRef.current[activeTab];
      gsap.to(indicatorRef.current, {
        x: activeTabElement.offsetLeft,
        width: activeTabElement.offsetWidth,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [activeTab]);

  const handleTabChange = (index) => {
    setActiveTab(index);
    onChange?.(index);
  };

  return (
    <div className={className}>
      <div className="relative bg-white/5 rounded-xl p-1 mb-6">
        <motion.div
          ref={indicatorRef}
          className="absolute top-1 left-1 h-[calc(100%-8px)] bg-gradient-to-r from-[#ff007f] to-[#ff4da6] rounded-lg"
          initial={false}
        />
        <div className="relative flex">
          {tabs.map((tab, index) => (
            <button
              key={index}
              ref={(el) => (tabsRef.current[index] = el)}
              onClick={() => handleTabChange(index)}
              className={`
                flex-1 px-6 py-3 text-sm font-medium rounded-lg transition-colors duration-300
                ${activeTab === index ? 'text-white' : 'text-white/70 hover:text-white'}
              `}
            >
              {tab.icon && <tab.icon className="w-4 h-4 mr-2 inline" />}
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {tabs[activeTab]?.content}
      </motion.div>
    </div>
  );
};

export default Tabs;