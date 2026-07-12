import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
  points?: Array<{ lat: number; lng: number; label?: string }>;
  lineColor?: string;
  showLabels?: boolean;
  labelClassName?: string;
  animationDuration?: number;
  className?: string; 
}

export function WorldMap({ 
  points = [], 
  lineColor = "#0ea5e9",
  showLabels = true,
  labelClassName = "text-sm",
  animationDuration = 15,
  className = ""
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const map = useMemo(
    () => new DottedMap({ height: 100, grid: "diagonal" }),
    []
  );

  const svgMap = useMemo(
    () => map.getSVG({
      radius: 0.22,
      color: "#FFFF7F40", // Hardcoded dark theme color
      shape: "circle",
      backgroundColor: "#0F172A", // Hardcoded dark theme color
    }),
    [map]
  );

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const projectedPoints = points.map(p => ({
    ...projectPoint(p.lat, p.lng),
    label: p.label
  }));

  const generateContinuousPath = (pts: Array<{x: number, y: number}>) => {
    if (pts.length < 2) return "";
    
    let path = `M ${pts[0].x} ${pts[0].y}`;
    const tension = 0.5; // Controls the roundness of the S-curves

    for (let i = 0; i < pts.length - 1; i++) {
      const p1 = pts[i];
      const p2 = pts[i + 1];

      // Calculate horizontal tangents to create beautiful, leveling S-curves 
      // without any artificial high loops or sharp corners
      const distanceX = Math.abs(p2.x - p1.x);
      
      const cp1x = p1.x + distanceX * tension;
      const cp1y = p1.y; // perfectly horizontal tangent at start

      const cp2x = p2.x - distanceX * tension;
      const cp2y = p2.y; // perfectly horizontal tangent at end

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const flightPath = generateContinuousPath(projectedPoints);

  // Calculate path fractions for synchronized sequential popups
  const distances = [];
  let totalDistance = 0;
  for (let i = 0; i < projectedPoints.length - 1; i++) {
    const p1 = projectedPoints[i];
    const p2 = projectedPoints[i + 1];
    const d = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    distances.push(d);
    totalDistance += d;
  }

  let currentDist = 0;
  const pathFractions: number[] = [0];
  for (let i = 0; i < distances.length; i++) {
    currentDist += distances[i];
    pathFractions.push(currentDist / totalDistance);
  }

  const equalTimes: number[] = [];
  for (let i = 0; i < projectedPoints.length; i++) {
    equalTimes.push(i / (projectedPoints.length - 1));
  }

  return (
    <div className={`w-full relative font-sans overflow-hidden ${className}`}>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none object-cover opacity-60"
        alt="world map"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-auto select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          
          <filter id="glow">
            <feMorphology operator="dilate" radius="0.5" />
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* The Continuous Flight Path Base */}
        {flightPath && (
          <path 
            d={flightPath}
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
          />
        )}
        
        {/* Animated Glow Line tracing the entire path */}
        {flightPath && (
          <motion.path
            d={flightPath}
            fill="none"
            stroke="url(#path-gradient)"
            strokeWidth="1.5"
            animate={{ pathLength: pathFractions }}
            transition={{ duration: animationDuration, repeat: Infinity, ease: "linear", times: equalTimes }}
          />
        )}

        {/* Render Points */}
        {projectedPoints.map((point, i) => {
          // Use equalTimes to trigger popups sequentially since traveling time is now equal
          const t_start = equalTimes[i];
          const t_end = i < projectedPoints.length - 1 ? equalTimes[i + 1] : 1;
          
          let t1 = Math.max(0, t_start - 0.001);
          let t2 = Math.min(1, t_start + 0.02); // Appears quickly
          let t3 = Math.max(0, t_end - 0.02);   // Disappears right before line leaves
          let t4 = Math.min(1, t_end + 0.001);
          
          if (t2 > t3) {
            t2 = (t_start + t_end) / 2;
            t3 = t2;
          }

          const times = [0, t1, t2, t3, t4, 1];

          return (
            <g key={`point-${i}`}>
              <motion.g
                onHoverStart={() => setHoveredLocation(point.label || `Location ${i}`)}
                onHoverEnd={() => setHoveredLocation(null)}
                className="cursor-pointer"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="3"
                  fill={lineColor}
                  filter="url(#glow)"
                  className="drop-shadow-lg"
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="3"
                  fill={lineColor}
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from="3"
                    to="12"
                    dur="2s"
                    begin={`${i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.6"
                    to="0"
                    dur="2s"
                    begin={`${i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </motion.g>
              
              {/* The Static Original City Label */}
              {showLabels && point.label && (
                <motion.g
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 * i, duration: 0.5 }}
                  className="pointer-events-none"
                >
                  <foreignObject
                    x={point.x - 50}
                    y={point.y - 35}
                    width="100"
                    height="30"
                    className="block overflow-visible"
                  >
                    <div className="flex items-center justify-center h-full whitespace-nowrap">
                      <span className="text-sm font-medium px-2 py-0.5 rounded-md bg-black/95 text-white border border-gray-700 shadow-sm">
                        {point.label}
                      </span>
                    </div>
                  </foreignObject>
                </motion.g>
              )}

              {/* The Traveling Drop-Down Client Box */}
              {showLabels && point.label && (
                <motion.g
                  className="pointer-events-none"
                  animate={{
                    opacity: [0, 0, 1, 1, 0, 0],
                    y: [-15, -15, 0, 0, -15, -15],
                    scale: [0.8, 0.8, 1, 1, 0.8, 0.8]
                  }}
                  transition={{
                    duration: animationDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: times
                  }}
                >
                  <foreignObject
                    x={point.x - 75}
                    y={point.y - 75}
                    width="150"
                    height="40"
                    className="block overflow-visible"
                  >
                    <div className="flex flex-col items-center justify-end h-full w-full pb-2">
                      <div className="bg-sky-900/90 backdrop-blur-md text-white border border-sky-500/50 shadow-2xl rounded-lg px-3 py-1 flex flex-col items-center transform transition-transform">
                        <span className="text-[11px] text-sky-200 font-bold tracking-widest uppercase">Active Client</span>
                      </div>
                      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-sky-500/50 -mt-[1px]"></div>
                    </div>
                  </foreignObject>
                </motion.g>
              )}
            </g>
          );
        })}

      </svg>
      
      {/* Mobile Tooltip */}
      <AnimatePresence>
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 bg-black/90 text-white px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm sm:hidden border border-gray-700"
          >
            {hoveredLocation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
