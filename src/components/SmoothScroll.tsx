import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1]);

  useEffect(() => {
    if (containerRef.current) {
      locomotiveScrollRef.current = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
        multiplier: 0.8,
        class: 'is-revealed',
        lerp: 0.1,
        smartphone: {
          smooth: true,
          multiplier: 0.8,
        },
        tablet: {
          smooth: true,
          multiplier: 0.8,
        }
      });
    }

    return () => {
      locomotiveScrollRef.current?.destroy();
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 transform origin-left z-50"
        style={{ scaleX }}
      />
      <div 
        ref={containerRef} 
        className="relative min-h-screen"
        data-scroll-container
      >
        <div data-scroll-section>
          {children}
        </div>
      </div>
    </>
  );
};

export default SmoothScroll;