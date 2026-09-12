import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export default function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Parse target number and non-numeric prefix/suffix (e.g. "99.9%", "500+", "25mm", "24/7", "10,000+", "0.005mm")
    // Match commas and decimals inside digits
    const numericMatch = value.match(/[\d,.]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const rawNumStr = numericMatch[0].replace(/,/g, '');
    const targetNum = parseFloat(rawNumStr);
    
    if (isNaN(targetNum)) {
      setDisplayValue(value);
      return;
    }

    const hasComma = numericMatch[0].includes(',');
    const decimalPlaces = rawNumStr.includes('.') ? rawNumStr.split('.')[1].length : 0;
    
    const prefix = value.substring(0, numericMatch.index);
    const suffix = value.substring((numericMatch.index || 0) + numericMatch[0].length);

    let startTime: number | null = null;
    const duration = 1800; // 1.8 seconds animation (completes within 2 seconds)

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function (easeOutExpo)
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentNum = targetNum * easedProgress;

      let formattedNum = currentNum.toFixed(decimalPlaces);
      if (hasComma) {
        const parts = formattedNum.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        formattedNum = parts.join('.');
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
