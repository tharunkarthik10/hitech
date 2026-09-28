import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Cpu, Sparkles, Play, Pause, RefreshCw } from 'lucide-react';

export default function RoboticMachineAnimation() {
  const [mode, setMode] = useState<'laser' | 'weld'>('laser');
  const [isRunning, setIsRunning] = useState(true);
  const [coords, setCoords] = useState({ x: 265, y: 195, z: 4.8 });

  // Update live simulated telemetry coordinates smoothly
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setCoords({
        x: Number((240 + Math.sin(Date.now() / 450) * 45).toFixed(1)),
        y: Number((190 + Math.cos(Date.now() / 550) * 25).toFixed(1)),
        z: Number((4.5 + Math.sin(Date.now() / 800) * 0.5).toFixed(2))
      });
    }, 120);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Motion paths for the robotic arm tip and joints
  // Using normalized 440 x 300 SVG coordinate system
  // Base at (100, 240)
  return (
    <div className="w-full lg:w-[460px] shrink-0 rounded-3xl bg-[#03131D]/90 border border-white/10 backdrop-blur-2xl p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between group">
      
      {/* Subtle Background Radial Ambient Glow */}
      <div 
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-colors duration-700" 
        style={{ backgroundColor: mode === 'laser' ? 'rgba(0, 166, 251, 0.15)' : 'rgba(249, 115, 22, 0.15)' }}
      />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#006494]/10 blur-3xl pointer-events-none" />

      {/* Top Header / Mode Switcher */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span 
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isRunning ? (mode === 'laser' ? 'bg-[#00A6FB]' : 'bg-orange-500') : 'bg-gray-500'
              }`}
            />
            <span 
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isRunning ? (mode === 'laser' ? 'bg-[#00A6FB]' : 'bg-orange-500') : 'bg-gray-500'
              }`}
            />
          </span>
          <div>
            <div className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5 font-sans">
              <span>6-Axis Robotic Cell</span>
              <span className="text-[10px] text-gray-400 font-normal">#RC-04</span>
            </div>
            <div className="text-[10px] text-gray-400 font-sans">
              {isRunning ? (mode === 'laser' ? '12kW Fiber Laser Active' : 'Precision TIG Weld Active') : 'System Paused'}
            </div>
          </div>
        </div>

        {/* Mode Toggle Pills */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-0.5 rounded-full text-[11px] font-medium">
          <button
            onClick={() => setMode('laser')}
            className={`px-2.5 py-1 rounded-full transition-all duration-300 font-sans ${
              mode === 'laser' 
                ? 'bg-[#00A6FB] text-white shadow-sm' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Laser Cut
          </button>
          <button
            onClick={() => setMode('weld')}
            className={`px-2.5 py-1 rounded-full transition-all duration-300 font-sans ${
              mode === 'weld' 
                ? 'bg-orange-500 text-white shadow-sm' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Robo Weld
          </button>
        </div>
      </div>

      {/* Main Robotic Machine SVG Animation Chamber */}
      <div className="relative w-full h-[230px] my-1 flex items-center justify-center overflow-hidden">
        
        {/* Isometric CNC Bed Grid Background */}
        <svg className="w-full h-full" viewBox="0 0 440 230" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Grid Pattern */}
            <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
            </pattern>

            {/* Glowing Laser Filter */}
            <filter id="laser-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Spark Flare Filter */}
            <filter id="spark-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Metallic Gradients */}
            <linearGradient id="robot-metal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            <linearGradient id="robot-accent" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#006494" />
              <stop offset="100%" stopColor="#00A6FB" />
            </linearGradient>

            <linearGradient id="bed-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#051923" />
            </linearGradient>
          </defs>

          {/* Grid Background */}
          <rect width="440" height="230" fill="url(#grid-pattern)" />

          {/* Heavy Machine Platform / Steel Work Bed */}
          <g transform="translate(0, 195)">
            {/* Main Plate Bed */}
            <rect x="25" y="0" width="390" height="28" rx="4" fill="url(#bed-gradient)" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" />
            {/* Guide Rails */}
            <line x1="30" y1="6" x2="410" y2="6" stroke="#00A6FB" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="30" y1="20" x2="410" y2="20" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
          </g>

          {/* Workpiece Mounted on Bed: Raw Metal Alloy Plate */}
          <g transform="translate(200, 182)">
            {/* Metal Block Base */}
            <rect x="0" y="0" width="170" height="14" rx="2" fill="#1E293B" stroke="#475569" strokeWidth="1" />
            <rect x="4" y="2" width="162" height="10" rx="1" fill="#334155" />
            
            {/* Clamps holding workpiece */}
            <rect x="-8" y="-3" width="14" height="18" rx="2" fill="#64748B" stroke="#0F172A" strokeWidth="1" />
            <circle cx="-1" cy="6" r="2" fill="#94A3B8" />
            <rect x="164" y="-3" width="14" height="18" rx="2" fill="#64748B" stroke="#0F172A" strokeWidth="1" />
            <circle cx="171" cy="6" r="2" fill="#94A3B8" />

            {/* Glowing Laser-Cut Contour Path on the Metal Surface */}
            <motion.path
              d="M 20 6 L 60 6 L 80 2 L 110 6 L 145 6"
              fill="none"
              stroke={mode === 'laser' ? '#00A6FB' : '#FB923C'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="140"
              animate={isRunning ? {
                strokeDashoffset: [140, 0, 140],
                opacity: [0.3, 1, 0.3]
              } : { strokeDashoffset: 0, opacity: 0.8 }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              filter="url(#laser-glow)"
            />
          </g>

          {/* ========================================================================= */}
          {/* 6-AXIS ARTICULATED ROBOTIC ARM ASSEMBLY */}
          {/* ========================================================================= */}
          {/* Machine Pedestal / Heavy Base at (75, 195) */}
          <g transform="translate(60, 165)">
            {/* Anchored Base Plate */}
            <path d="M 0 30 L 45 30 L 40 10 L 5 10 Z" fill="url(#robot-metal)" stroke="#475569" strokeWidth="1" />
            <circle cx="22" cy="22" r="5" fill="#00A6FB" fillOpacity="0.4" />
            
            {/* Turntable Pedestal Cylinder */}
            <rect x="8" y="0" width="30" height="12" rx="3" fill="#334155" stroke="#64748B" strokeWidth="1" />
            {/* Status LED ring */}
            <line 
              x1="12" y1="6" x2="34" y2="6" 
              stroke={mode === 'laser' ? '#00A6FB' : '#F97316'} 
              strokeWidth="2" 
              strokeLinecap="round" 
              filter="url(#laser-glow)"
            />
          </g>

          {/* Shoulder Pivot Group */}
          <g transform="translate(82, 165)">
            {/* Shoulder Joint Housing */}
            <circle cx="0" cy="0" r="14" fill="url(#robot-metal)" stroke="#475569" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="7" fill="#006494" />
            <circle cx="0" cy="0" r="3" fill="#ffffff" />

            {/* Animated Bicep / Lower Boom Arm */}
            <motion.g
              animate={isRunning ? {
                rotate: [0, 12, -4, 0]
              } : { rotate: 4 }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Lower Boom Cylinder & Structural Arm */}
              <path d="M -7 0 L -4 -65 L 4 -65 L 7 0 Z" fill="url(#robot-metal)" stroke="#475569" strokeWidth="1.2" />
              {/* Arm Accent Inlay Strip */}
              <line 
                x1="0" y1="-8" x2="0" y2="-55" 
                stroke={mode === 'laser' ? '#00A6FB' : '#F97316'} 
                strokeWidth="2" 
                strokeLinecap="round" 
              />
              {/* Hydraulic Piston Rod */}
              <line x1="6" y1="-12" x2="10" y2="-45" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />

              {/* Elbow Joint at (0, -65) */}
              <g transform="translate(0, -65)">
                <circle cx="0" cy="0" r="11" fill="url(#robot-metal)" stroke="#475569" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="5" fill="#334155" />

                {/* Animated Forearm Section */}
                <motion.g
                  animate={isRunning ? {
                    rotate: [45, 25, 55, 45]
                  } : { rotate: 35 }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {/* Forearm Body */}
                  <path d="M -5 0 L -3 -70 L 3 -70 L 5 0 Z" fill="url(#robot-metal)" stroke="#475569" strokeWidth="1.2" />
                  <rect x="-2" y="-55" width="4" height="25" rx="1" fill="#006494" />

                  {/* Wrist Joint at (0, -70) */}
                  <g transform="translate(0, -70)">
                    <circle cx="0" cy="0" r="8" fill="#475569" stroke="#64748B" strokeWidth="1" />
                    
                    {/* Toolhead Flange & Nozzle Assembly */}
                    <motion.g
                      animate={isRunning ? {
                        rotate: [-45, -35, -55, -45]
                      } : { rotate: -40 }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {/* Heavy Tool Body */}
                      <rect x="-7" y="0" width="14" height="18" rx="2" fill="#0F172A" stroke="#64748B" strokeWidth="1" />
                      {/* Laser / Plasma Nozzle Tip Cone */}
                      <path d="M -5 18 L 5 18 L 1 32 L -1 32 Z" fill="#94A3B8" stroke="#475569" strokeWidth="0.8" />
                      
                      {/* Active Beam Emission from Nozzle Tip (at Y = 32) */}
                      {isRunning && (
                        <g transform="translate(0, 32)">
                          {/* High Energy Beam Core */}
                          <motion.line
                            x1="0" y1="0" x2="0" y2="40"
                            stroke={mode === 'laser' ? '#00A6FB' : '#FB923C'}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            filter="url(#laser-glow)"
                            animate={{
                              strokeWidth: [2, 3.5, 2],
                              opacity: [0.8, 1, 0.8]
                            }}
                            transition={{ duration: 0.2, repeat: Infinity }}
                          />
                          {/* White-Hot Core */}
                          <line x1="0" y1="0" x2="0" y2="40" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />

                          {/* Contact Spark Flash Point (At workpiece impact) */}
                          <g transform="translate(0, 40)">
                            {/* Glowing Plasma Arc Ball */}
                            <motion.circle
                              cx="0" cy="0" r="5"
                              fill={mode === 'laser' ? '#E0F2FE' : '#FFEDD5'}
                              filter="url(#spark-glow)"
                              animate={{ scale: [1, 1.4, 0.9, 1.2, 1] }}
                              transition={{ duration: 0.25, repeat: Infinity }}
                            />

                            {/* Flying Ejected Sparks Particles */}
                            <motion.circle
                              cx="0" cy="0" r="1.5"
                              fill={mode === 'laser' ? '#38BDF8' : '#F97316'}
                              animate={{
                                cx: [-4, -18, -28],
                                cy: [-2, -14, -2],
                                opacity: [1, 0.8, 0],
                                scale: [1, 0.8, 0]
                              }}
                              transition={{ duration: 0.45, repeat: Infinity, ease: 'easeOut' }}
                            />
                            <motion.circle
                              cx="0" cy="0" r="1.8"
                              fill="#FFFFFF"
                              animate={{
                                cx: [2, 14, 24],
                                cy: [-2, -18, -6],
                                opacity: [1, 0.9, 0],
                                scale: [1, 0.8, 0]
                              }}
                              transition={{ duration: 0.38, repeat: Infinity, ease: 'easeOut', delay: 0.08 }}
                            />
                            <motion.circle
                              cx="0" cy="0" r="1.2"
                              fill={mode === 'laser' ? '#7DD3FC' : '#FB923C'}
                              animate={{
                                cx: [-2, -8, -16],
                                cy: [-4, -22, -10],
                                opacity: [1, 0.7, 0],
                                scale: [1, 0.7, 0]
                              }}
                              transition={{ duration: 0.5, repeat: Infinity, ease: 'easeOut', delay: 0.15 }}
                            />
                            <motion.circle
                              cx="0" cy="0" r="1.5"
                              fill={mode === 'laser' ? '#0284C7' : '#EA580C'}
                              animate={{
                                cx: [4, 18, 30],
                                cy: [-1, -12, 2],
                                opacity: [1, 0.8, 0],
                                scale: [1, 0.6, 0]
                              }}
                              transition={{ duration: 0.42, repeat: Infinity, ease: 'easeOut', delay: 0.12 }}
                            />
                          </g>
                        </g>
                      )}
                    </motion.g>
                  </g>
                </motion.g>
              </g>
            </motion.g>
          </g>

          {/* Dynamic Laser Guide Reticle Tracking Overlay */}
          {isRunning && (
            <motion.g
              animate={{
                x: [225, 265, 310, 280, 225],
                y: [186, 184, 186, 188, 186]
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <circle cx="0" cy="0" r="8" fill="none" stroke={mode === 'laser' ? '#00A6FB' : '#F97316'} strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
              <line x1="-12" y1="0" x2="12" y2="0" stroke={mode === 'laser' ? '#00A6FB' : '#F97316'} strokeWidth="0.8" opacity="0.5" />
              <line x1="0" y1="-12" x2="0" y2="12" stroke={mode === 'laser' ? '#00A6FB' : '#F97316'} strokeWidth="0.8" opacity="0.5" />
            </motion.g>
          )}
        </svg>

        {/* Live Coordinate Overlay HUD in Corner */}
        <div className="absolute top-2 left-2 bg-[#051923]/80 border border-white/10 backdrop-blur-md px-2.5 py-1.5 rounded-lg text-[10px] font-mono text-gray-300 space-y-0.5 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-sans text-[9px] uppercase font-bold">Tool Coordinates</span>
          </div>
          <div className="flex gap-2 text-white font-medium">
            <span>X: <span className="text-[#00A6FB]">{coords.x}</span></span>
            <span>Y: <span className="text-[#00A6FB]">{coords.y}</span></span>
            <span>Z: <span className="text-emerald-400">{coords.z}</span></span>
          </div>
        </div>

        {/* Play / Pause Toggle Button */}
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors backdrop-blur-md flex items-center gap-1 text-[10px] font-sans"
          title={isRunning ? "Pause Machine" : "Resume Machine"}
        >
          {isRunning ? (
            <>
              <Pause className="w-3 h-3 text-[#00A6FB]" />
              <span className="text-gray-300">Live</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-emerald-400" />
              <span className="text-gray-300">Paused</span>
            </>
          )}
        </button>
      </div>

      {/* Bottom Live Kinematic Metrics Footer */}
      <div className="relative z-10 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-[11px] font-sans">
        <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="text-[10px] text-gray-400 font-medium">Feed Rate</div>
          <div className="text-xs font-bold text-white mt-0.5">85 mm/s</div>
        </div>
        <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="text-[10px] text-gray-400 font-medium">Tolerance</div>
          <div className="text-xs font-bold text-[#00A6FB] mt-0.5">±0.005 mm</div>
        </div>
        <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="text-[10px] text-gray-400 font-medium">Power Level</div>
          <div className="text-xs font-bold text-emerald-400 mt-0.5">12.0 kW</div>
        </div>
      </div>

    </div>
  );
}
