import React from 'react';

export const PineTree = ({ className = '', color = '#2a4332', opacity = 1 }) => (
  <svg viewBox="0 0 80 200" fill="none" className={className} style={{ opacity }}>
    {/* Trunk */}
    <rect x="34" y="155" width="12" height="45" fill={color} rx="2" />
    {/* Top tier */}
    <polygon points="40,10 22,58 58,58" fill={color} />
    {/* Mid tier */}
    <polygon points="40,38 16,95 64,95" fill={color} />
    {/* Bottom tier */}
    <polygon points="40,68 10,140 70,140" fill={color} />
    {/* Ground tier */}
    <polygon points="40,100 6,165 74,165" fill={color} />
  </svg>
);

export const RoundTree = ({ className = '', color = '#3a6147', opacity = 1 }) => (
  <svg viewBox="0 0 100 200" fill="none" className={className} style={{ opacity }}>
    {/* Trunk */}
    <rect x="44" y="140" width="12" height="60" fill={color} rx="2" />
    {/* Canopy layers */}
    <ellipse cx="50" cy="100" rx="45" ry="55" fill={color} />
    <ellipse cx="50" cy="85" rx="38" ry="45" fill={color} opacity="0.9" />
    <ellipse cx="50" cy="65" rx="30" ry="35" fill={color} opacity="0.85" />
  </svg>
);

export const TallTree = ({ className = '', color = '#2a4332', opacity = 1 }) => (
  <svg viewBox="0 0 60 240" fill="none" className={className} style={{ opacity }}>
    <rect x="25" y="185" width="10" height="55" fill={color} rx="2" />
    <polygon points="30,5 12,65 48,65" fill={color} />
    <polygon points="30,40 8,108 52,108" fill={color} />
    <polygon points="30,80 5,158 55,158" fill={color} />
    <polygon points="30,115 3,195 57,195" fill={color} />
  </svg>
);

export const OakTree = ({ className = '', color = '#3a5c42', opacity = 1 }) => (
  <svg viewBox="0 0 140 200" fill="none" className={className} style={{ opacity }}>
    {/* Trunk with branches */}
    <path d="M70 190 L70 130 L70 100" stroke={color} strokeWidth="10" strokeLinecap="round" fill="none" />
    <path d="M70 120 L40 90" stroke={color} strokeWidth="7" strokeLinecap="round" fill="none" />
    <path d="M70 110 L100 80" stroke={color} strokeWidth="7" strokeLinecap="round" fill="none" />
    <path d="M70 130 L50 100" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />
    {/* Left foliage */}
    <ellipse cx="32" cy="72" rx="32" ry="28" fill={color} opacity="0.9" />
    {/* Right foliage */}
    <ellipse cx="102" cy="62" rx="30" ry="26" fill={color} opacity="0.85" />
    {/* Center foliage */}
    <ellipse cx="65" cy="55" rx="38" ry="36" fill={color} />
    <ellipse cx="75" cy="40" rx="28" ry="24" fill={color} opacity="0.8" />
  </svg>
);

export const BranchLinework = ({ className = '', color = '#5c3d28', opacity = 0.4 }) => (
  <svg viewBox="0 0 300 200" fill="none" className={className} style={{ opacity }}>
    <path d="M0 180 Q50 140 100 120 Q140 105 170 80" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M170 80 Q185 55 210 40" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M170 80 Q195 70 230 75" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M100 120 Q110 95 130 85" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" />
    <path d="M50 140 Q55 118 70 108" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" />
    {/* Small leaves */}
    <ellipse cx="213" cy="38" rx="8" ry="5" fill={color} opacity="0.5" transform="rotate(-20 213 38)" />
    <ellipse cx="232" cy="72" rx="7" ry="4" fill={color} opacity="0.45" transform="rotate(15 232 72)" />
    <ellipse cx="133" cy="82" rx="6" ry="4" fill={color} opacity="0.4" transform="rotate(-30 133 82)" />
    <ellipse cx="72" cy="105" rx="6" ry="3.5" fill={color} opacity="0.4" transform="rotate(10 72 105)" />
  </svg>
);

export const LeafCluster = ({ className = '', color = '#5c7a5a', opacity = 0.5 }) => (
  <svg viewBox="0 0 200 200" fill="none" className={className} style={{ opacity }}>
    <path d="M100 180 C100 180 30 140 20 80 C10 20 60 5 100 50 C140 5 190 20 180 80 C170 140 100 180 100 180Z" fill={color} opacity="0.3" />
    <path d="M100 180 C100 180 40 150 35 100 C30 50 70 30 100 60" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
    <path d="M100 180 C100 180 160 150 165 100 C170 50 130 30 100 60" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
    {/* Veins */}
    <path d="M100 60 L100 180" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
    <path d="M100 90 L65 130" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
    <path d="M100 90 L135 130" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
    <path d="M100 110 L72 145" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
    <path d="M100 110 L128 145" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
  </svg>
);

export const HeroLandscape = () => (
  <svg viewBox="0 0 1440 520" preserveAspectRatio="none" className="w-full" style={{ display: 'block' }}>
    {/* Sky gradient fill */}
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#d4e5c8" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#a8c5a0" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c8dcc0" />
        <stop offset="100%" stopColor="#b0c8a8" />
      </linearGradient>
      <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8aaa78" />
        <stop offset="100%" stopColor="#6b8a60" />
      </linearGradient>
      <linearGradient id="hill3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4d7a5c" />
        <stop offset="100%" stopColor="#3a6147" />
      </linearGradient>
      <linearGradient id="hill4" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2a4332" />
        <stop offset="100%" stopColor="#1e3228" />
      </linearGradient>
    </defs>
    {/* Far hills - lightest */}
    <path d="M0,300 C150,200 300,240 450,210 C600,180 750,220 900,195 C1050,170 1200,210 1440,185 L1440,520 L0,520 Z" fill="url(#hill1)" opacity="0.6" />
    {/* Mid far hills */}
    <path d="M0,340 C120,270 280,300 420,280 C560,260 700,295 860,270 C1020,245 1200,275 1440,255 L1440,520 L0,520 Z" fill="url(#hill2)" />
    {/* Mid hills */}
    <path d="M0,380 C100,330 250,355 400,340 C550,325 700,355 880,335 C1060,315 1250,350 1440,335 L1440,520 L0,520 Z" fill="url(#hill3)" />
    {/* Foreground hills */}
    <path d="M0,420 C180,385 360,410 560,395 C760,380 960,415 1160,400 C1280,392 1360,405 1440,400 L1440,520 L0,520 Z" fill="url(#hill4)" />
    
    {/* Left Pine Trees silhouettes */}
    {/* Tree 1 */}
    <g transform="translate(30, 295)">
      <rect x="12" y="62" width="5" height="18" fill="#1a2e22" />
      <polygon points="15,5 5,28 25,28" fill="#1a2e22" />
      <polygon points="15,18 3,45 27,45" fill="#1a2e22" />
      <polygon points="15,32 1,62 29,62" fill="#1a2e22" />
    </g>
    {/* Tree 2 */}
    <g transform="translate(60, 270)">
      <rect x="14" y="75" width="6" height="22" fill="#1a2e22" />
      <polygon points="17,5 5,32 29,32" fill="#1a2e22" />
      <polygon points="17,22 2,55 32,55" fill="#1a2e22" />
      <polygon points="17,40 0,78 34,78" fill="#1a2e22" />
    </g>
    {/* Tree 3 */}
    <g transform="translate(95, 285)">
      <rect x="10" y="58" width="4" height="16" fill="#1a2e22" />
      <polygon points="12,5 4,25 20,25" fill="#1a2e22" />
      <polygon points="12,16 2,40 22,40" fill="#1a2e22" />
      <polygon points="12,28 0,58 24,58" fill="#1a2e22" />
    </g>
    
    {/* Right Pine Trees */}
    <g transform="translate(1320, 280)">
      <rect x="12" y="65" width="5" height="20" fill="#1a2e22" />
      <polygon points="15,5 5,30 25,30" fill="#1a2e22" />
      <polygon points="15,20 2,52 28,52" fill="#1a2e22" />
      <polygon points="15,36 0,68 30,68" fill="#1a2e22" />
    </g>
    <g transform="translate(1355, 260)">
      <rect x="14" y="78" width="6" height="24" fill="#1a2e22" />
      <polygon points="17,5 5,35 29,35" fill="#1a2e22" />
      <polygon points="17,24 2,60 32,60" fill="#1a2e22" />
      <polygon points="17,44 0,82 34,82" fill="#1a2e22" />
    </g>
    <g transform="translate(1390, 278)">
      <rect x="10" y="60" width="4" height="18" fill="#1a2e22" />
      <polygon points="12,5 4,26 20,26" fill="#1a2e22" />
      <polygon points="12,18 1,44 23,44" fill="#1a2e22" />
      <polygon points="12,32 0,62 24,62" fill="#1a2e22" />
    </g>
    
    {/* Mid scattered trees */}
    <g transform="translate(560, 330)">
      <rect x="8" y="45" width="4" height="12" fill="#1a2e22" opacity="0.7" />
      <polygon points="10,5 3,22 17,22" fill="#1a2e22" opacity="0.7" />
      <polygon points="10,14 1,36 19,36" fill="#1a2e22" opacity="0.7" />
      <polygon points="10,26 0,48 20,48" fill="#1a2e22" opacity="0.7" />
    </g>
    <g transform="translate(590, 322)">
      <rect x="9" y="52" width="4.5" height="14" fill="#1a2e22" opacity="0.7" />
      <polygon points="11,5 4,24 18,24" fill="#1a2e22" opacity="0.7" />
      <polygon points="11,16 2,40 20,40" fill="#1a2e22" opacity="0.7" />
      <polygon points="11,28 0,54 22,54" fill="#1a2e22" opacity="0.7" />
    </g>
    <g transform="translate(860, 320)">
      <rect x="8" y="48" width="4" height="13" fill="#1a2e22" opacity="0.6" />
      <polygon points="10,5 3,22 17,22" fill="#1a2e22" opacity="0.6" />
      <polygon points="10,14 1,36 19,36" fill="#1a2e22" opacity="0.6" />
      <polygon points="10,26 0,50 20,50" fill="#1a2e22" opacity="0.6" />
    </g>
  </svg>
);

export const SectionDivider = ({ flip = false }) => (
  <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full" style={{ transform: flip ? 'scaleY(-1)' : 'none', display: 'block', marginBottom: '-2px' }}>
    <path d="M0,0 C200,60 400,20 600,45 C800,70 1000,25 1200,50 C1320,62 1400,35 1440,45 L1440,80 L0,80 Z" fill="#f2e8d5" />
  </svg>
);

export const FloralBorder = ({ className = '', color = '#6b8a5e', opacity = 0.25, style = {} }: { className?: string; color?: string; opacity?: number; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 400 60" fill="none" className={className} style={{ opacity, ...style }}>
    {/* Center stem */}
    <path d="M20 30 Q100 20 200 30 Q300 40 380 30" stroke={color} strokeWidth="1.5" fill="none" />
    {/* Left leaves */}
    <ellipse cx="60" cy="22" rx="12" ry="7" fill={color} opacity="0.6" transform="rotate(-25 60 22)" />
    <ellipse cx="100" cy="24" rx="10" ry="6" fill={color} opacity="0.5" transform="rotate(-15 100 24)" />
    <ellipse cx="80" cy="38" rx="9" ry="5" fill={color} opacity="0.45" transform="rotate(20 80 38)" />
    {/* Right leaves */}
    <ellipse cx="280" cy="22" rx="12" ry="7" fill={color} opacity="0.6" transform="rotate(25 280 22)" />
    <ellipse cx="320" cy="24" rx="10" ry="6" fill={color} opacity="0.5" transform="rotate(15 320 24)" />
    <ellipse cx="300" cy="38" rx="9" ry="5" fill={color} opacity="0.45" transform="rotate(-20 300 38)" />
    {/* Center flower */}
    <circle cx="200" cy="30" r="5" fill={color} opacity="0.7" />
    <circle cx="192" cy="24" r="3.5" fill={color} opacity="0.5" />
    <circle cx="208" cy="24" r="3.5" fill={color} opacity="0.5" />
    <circle cx="192" cy="36" r="3.5" fill={color} opacity="0.5" />
    <circle cx="208" cy="36" r="3.5" fill={color} opacity="0.5" />
  </svg>
);

export const CornerBotanical = ({ className = '', color = '#5c7a5a', opacity = 0.2 }) => (
  <svg viewBox="0 0 200 200" fill="none" className={className} style={{ opacity }}>
    <path d="M10 190 Q30 150 50 120 Q70 90 90 70 Q110 50 140 30" stroke={color} strokeWidth="2" fill="none" />
    <path d="M90 70 Q75 50 60 40" stroke={color} strokeWidth="1.5" fill="none" />
    <path d="M90 70 Q105 50 120 45" stroke={color} strokeWidth="1.5" fill="none" />
    <ellipse cx="57" cy="37" rx="10" ry="6" fill={color} opacity="0.6" transform="rotate(-35 57 37)" />
    <ellipse cx="122" cy="42" rx="10" ry="6" fill={color} opacity="0.6" transform="rotate(25 122 42)" />
    <path d="M50 120 Q35 108 25 95" stroke={color} strokeWidth="1.2" fill="none" />
    <ellipse cx="22" cy="92" rx="8" ry="5" fill={color} opacity="0.5" transform="rotate(-40 22 92)" />
    <path d="M140 30 Q148 15 155 8" stroke={color} strokeWidth="1.2" fill="none" />
    <ellipse cx="157" cy="7" rx="7" ry="4" fill={color} opacity="0.5" transform="rotate(10 157 7)" />
    <path d="M30 150 Q20 138 12 128" stroke={color} strokeWidth="1" fill="none" />
  </svg>
);