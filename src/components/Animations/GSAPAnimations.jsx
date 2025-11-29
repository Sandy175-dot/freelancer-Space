import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Floating Animation Component
export const FloatingElement = ({ children, className = '', delay = 0 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      y: -20,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: delay
    });
  }, [delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

// Stagger Animation for Lists
export const StaggerContainer = ({ children, className = '', staggerDelay = 0.1 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.children;
    
    gsap.fromTo(items, 
      {
        opacity: 0,
        y: 50,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: staggerDelay
      }
    );
  }, [staggerDelay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

// Magnetic Button Effect
export const MagneticButton = ({ children, className = '', strength = 0.3 }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={buttonRef} className={className}>
      {children}
    </div>
  );
};

// Parallax Scroll Effect
export const ParallaxElement = ({ children, className = '', speed = 0.5 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, [speed]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

// Morphing Shape Animation
export const MorphingShape = ({ className = '' }) => {
  const shapeRef = useRef(null);

  useEffect(() => {
    const shape = shapeRef.current;
    if (!shape) return;

    gsap.to(shape, {
      borderRadius: "50% 20% 80% 30%",
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  }, []);

  return (
    <div 
      ref={shapeRef}
      className={`bg-gradient-to-r from-indigo-500/20 to-purple-500/20 ${className}`}
      style={{ borderRadius: "30% 70% 70% 30%" }}
    />
  );
};

// Text Reveal Animation
export const TextReveal = ({ children, className = '', delay = 0 }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    gsap.fromTo(text,
      {
        opacity: 0,
        y: 100,
        skewY: 7
      },
      {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: delay
      }
    );
  }, [delay]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

// Glitch Effect
export const GlitchText = ({ children, className = '' }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const glitchAnimation = () => {
      gsap.to(text, {
        x: Math.random() * 4 - 2,
        y: Math.random() * 4 - 2,
        duration: 0.1,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(text, {
            x: 0,
            y: 0,
            duration: 0.1
          });
        }
      });
    };

    const interval = setInterval(glitchAnimation, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );
};

// Liquid Button Effect
export const LiquidButton = ({ children, className = '', onClick }) => {
  const buttonRef = useRef(null);
  const liquidRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const liquid = liquidRef.current;
    if (!button || !liquid) return;

    const handleMouseEnter = () => {
      gsap.to(liquid, {
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(liquid, {
        scale: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const handleClick = (e) => {
      const rect = button.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      gsap.set(liquid, { left: `${x}%`, top: `${y}%` });
      gsap.fromTo(liquid, 
        { scale: 0 },
        { 
          scale: 4, 
          duration: 0.6, 
          ease: "power2.out",
          onComplete: () => gsap.to(liquid, { scale: 0, duration: 0.3 })
        }
      );

      if (onClick) onClick(e);
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('click', handleClick);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('click', handleClick);
    };
  }, [onClick]);

  return (
    <button ref={buttonRef} className={`relative overflow-hidden ${className}`}>
      <div 
        ref={liquidRef}
        className="absolute w-4 h-4 bg-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 scale-0"
      />
      {children}
    </button>
  );
};

export default {
  FloatingElement,
  StaggerContainer,
  MagneticButton,
  ParallaxElement,
  MorphingShape,
  TextReveal,
  GlitchText,
  LiquidButton
};