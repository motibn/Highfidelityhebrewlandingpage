import { KM } from './tokens';

/** Subtle sound-wave linework — analog music accent. */
export function SoundWave({
  color = KM.brass,
  opacity = 0.4,
}: {
  color?: string;
  opacity?: number;
}) {
  return (
    <svg viewBox="0 0 240 48" fill="none" aria-hidden style={{ width: '100%', height: 'auto', display: 'block' }}>
      <path
        d="M0 24 C16 8, 32 40, 48 24 S80 8, 96 24 S128 40, 144 24 S176 8, 192 24 S224 40, 240 24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity={opacity}
      />
      <path
        d="M0 24 C12 16, 28 32, 48 24 S76 14, 96 24 S124 36, 144 24 S172 16, 192 24 S220 32, 240 24"
        stroke={color}
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity={opacity * 0.65}
      />
    </svg>
  );
}

/** Concentric vinyl ring — corner decoration, keep opacity low. */
export function VinylRing({
  color = KM.brass,
  opacity = 0.28,
}: {
  color?: string;
  opacity?: number;
}) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden style={{ width: '100%', height: 'auto', display: 'block' }}>
      <circle cx="100" cy="100" r="92" stroke={color} strokeWidth="1.2" opacity={opacity} />
      <circle cx="100" cy="100" r="72" stroke={color} strokeWidth="1" opacity={opacity * 0.8} />
      <circle cx="100" cy="100" r="52" stroke={color} strokeWidth="1" opacity={opacity * 0.65} />
      <circle cx="100" cy="100" r="32" stroke={color} strokeWidth="1.4" opacity={opacity} />
      <circle cx="100" cy="100" r="8" fill={color} opacity={opacity * 0.9} />
    </svg>
  );
}

/** Five staff lines behind section titles. */
export function StaffLines({
  color = KM.brass,
  opacity = 0.22,
}: {
  color?: string;
  opacity?: number;
}) {
  return (
    <svg viewBox="0 0 320 40" fill="none" aria-hidden style={{ width: '100%', height: 'auto', display: 'block' }}>
      {[8, 14, 20, 26, 32].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="320"
          y2={y}
          stroke={color}
          strokeWidth="1"
          opacity={opacity}
        />
      ))}
    </svg>
  );
}
