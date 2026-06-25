/**
 * Delta Cube — the ARM brand mark.
 * An isometric cube (structure / Web3) holding an inscribed upward delta (Δ — change / dev).
 * Geometry is fixed; only stroke color/size may change per brand guidelines.
 */
export function DeltaCube({ size = 40, stroke = "currentColor", className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      stroke={stroke}
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      role="img"
      aria-label="ARM"
    >
      <path
        d="M100 54 L139.8 77 L139.8 123 L100 146 L60.2 123 L60.2 77 Z"
        strokeWidth="2.8"
      />
      <path
        d="M100 100 L100 54 M100 100 L60.2 123 M100 100 L139.8 123"
        strokeWidth="2.8"
      />
      <path d="M100 54 L139.8 123 L60.2 123 Z" strokeWidth="5" />
    </svg>
  );
}

export default DeltaCube;
