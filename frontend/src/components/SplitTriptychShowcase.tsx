import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface SplitTriptychShowcaseProps {
  slice1?: string;
  slice2?: string;
  slice3?: string;
  className?: string;
}

export default function SplitTriptychShowcase({
  slice1 = "/production_welder_slice_1.png",
  slice2 = "/production_welder_slice_2.png",
  slice3 = "/production_welder_slice_3.png",
  className = "",
}: SplitTriptychShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress as the section enters the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center 50%"],
  });

  // Smooth out scroll momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // Staggered vertical translation: each slice moves upward from a lower offset
  // and reaches exactly y = 0 (its natural original height) when in view
  const y1 = useTransform(smoothProgress, [0, 1], [100, 0], { clamp: true });
  const y2 = useTransform(smoothProgress, [0, 1], [220, 0], { clamp: true });
  const y3 = useTransform(smoothProgress, [0, 1], [140, 0], { clamp: true });

  // Subtle opacity ramp as they ascend
  const opacity1 = useTransform(smoothProgress, [0, 0.4], [0.65, 1], { clamp: true });
  const opacity2 = useTransform(smoothProgress, [0, 0.55], [0.45, 1], { clamp: true });
  const opacity3 = useTransform(smoothProgress, [0, 0.45], [0.6, 1], { clamp: true });

  return (
    <section
      ref={containerRef}
      id="facility-feature"
      className={`w-full overflow-hidden pt-6 pb-20 sm:pb-28 ${className}`}
    >
      {/* 3-Column Split Grid */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4 lg:gap-6 items-start">
        {/* Slice 1 (Left) */}
        <motion.div
          style={{ y: y1, opacity: opacity1 }}
          className="rounded-xl sm:rounded-2xl lg:rounded-[26px] overflow-hidden border border-gray-200/90 shadow-md bg-black aspect-[341/567] relative group"
        >
          <img
            src={slice1}
            alt="Facility Welding Cell - Left Section"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </motion.div>

        {/* Slice 2 (Center - Welding Arc & Helmet) */}
        <motion.div
          style={{ y: y2, opacity: opacity2 }}
          className="rounded-xl sm:rounded-2xl lg:rounded-[26px] overflow-hidden border border-gray-200/90 shadow-lg bg-black aspect-[341/567] relative group"
        >
          <img
            src={slice2}
            alt="Facility Welding Cell - Center Section"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </motion.div>

        {/* Slice 3 (Right) */}
        <motion.div
          style={{ y: y3, opacity: opacity3 }}
          className="rounded-xl sm:rounded-2xl lg:rounded-[26px] overflow-hidden border border-gray-200/90 shadow-md bg-black aspect-[342/567] relative group"
        >
          <img
            src={slice3}
            alt="Facility Welding Cell - Right Section"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </motion.div>
      </div>
    </section>
  );
}
