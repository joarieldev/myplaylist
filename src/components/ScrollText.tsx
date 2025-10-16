import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export default function ScrollText({ text, width }: { text: string, width: number }) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkWidth = () => {
      if (textRef.current && containerRef.current) {
        const titleWidth = textRef.current.offsetWidth;
        const containerWidth = containerRef.current.offsetWidth;

        const isOverflow = titleWidth > containerWidth;
        setShouldAnimate(isOverflow);

        if (isOverflow) {
          const distance = titleWidth - containerWidth;
          setTranslateX(-distance);
        }
      }
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [text]);

  return (
    <div 
      ref={containerRef}
      className="overflow-hidden whitespace-nowrap"
      style={{maxWidth: width}}
    >
      <motion.div
        key={text}
        ref={textRef}
        className="inline-block"
        animate={shouldAnimate ? { x: [0, 0, translateX, translateX] } : {x: 0}}
        transition={shouldAnimate ? {
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          times: [0, 0.2, 0.8, 1],
        }: {}}
      >
        {text}
      </motion.div>
    </div>
  );
}