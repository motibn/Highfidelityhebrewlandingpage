import { KM } from './tokens';

/** Subtle sound-wave linework — music accent without changing the campaign UI. */
export function SoundWave({
  color = KM.greenSage,
  opacity = 0.28,
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
