import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedMap() {
  const mapUrl = "https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg";

  // Coordinates for the path (viewBox is 1000x500)
  const jfk = { x: 260, y: 170, label: 'JFK' };
  const zrh = { x: 490, y: 140, label: 'ZRH' };
  const dxb = { x: 630, y: 220, label: 'DXB' };
  const tpe = { x: 840, y: 230, label: 'TPE' };
  
  // Smooth curve through the cities
  const flightPath = `M ${jfk.x} ${jfk.y} Q 375 80 ${zrh.x} ${zrh.y} Q 560 170 ${dxb.x} ${dxb.y} Q 735 200 ${tpe.x} ${tpe.y}`;

  return (
    <div className="absolute inset-0 w-full h-full bg-[#0F172A] overflow-hidden pointer-events-none">
      {/* Background Map */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url(${mapUrl})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'invert(1) brightness(1.5)'
        }}
      />
      
      {/* SVG Overlay */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="none">
        
        {/* The Flight Path Base */}
        <path 
          d={flightPath}
          fill="none"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="2"
        />
        
        {/* Animated Glow Line tracing the path */}
        <motion.path
          d={flightPath}
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* City Dots and Labels */}
        {[jfk, zrh, dxb, tpe].map((city, idx) => (
          <g key={idx}>
            <circle cx={city.x} cy={city.y} r="5" fill="#fff" />
            <circle cx={city.x} cy={city.y} r="15" fill="rgba(255,255,255,0.3)" className="animate-ping" />
            <text x={city.x} y={city.y - 20} fill="#fff" fontSize="14" fontWeight="600" textAnchor="middle" className="tracking-widest">
              {city.label}
            </text>
          </g>
        ))}

        {/* The Airplane */}
        <g fill="#fff">
          {/* A classic solid airplane icon path */}
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" transform="translate(-12, -12) scale(1.5) rotate(90)" />
          <animateMotion 
            dur="8s" 
            repeatCount="indefinite"
            path={flightPath}
            rotate="auto"
          />
        </g>
      </svg>
    </div>
  );
}
