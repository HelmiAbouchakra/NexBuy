import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const NexBuyIcon: React.FC<IconProps> = ({ size = 100, ...props }) => (
  <svg
    width={size}
    height={(size * 300) / 500}
    viewBox="0 0 500 300"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Definitions for filters */}
    <defs>
      {/* Premium text effect with multiple layers */}
      <filter
        id="premium-text-effect"
        x="-15%"
        y="-15%"
        width="130%"
        height="130%"
      >
        <feOffset dx="3" dy="3" in="SourceAlpha" result="offsetBlur" />
        <feGaussianBlur in="offsetBlur" stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />

        {/* Inner bevel effect */}
        <feMorphology
          operator="dilate"
          radius="1"
          in="SourceAlpha"
          result="expanded"
        />
        <feOffset
          dx="-0.5"
          dy="-0.5"
          in="expanded"
          result="innerShadowOffset"
        />
        <feComposite
          in="innerShadowOffset"
          in2="SourceAlpha"
          operator="out"
          result="innerShadow"
        />
        <feFlood floodColor="white" floodOpacity="0.6" result="innerGlow" />
        <feComposite
          in="innerGlow"
          in2="innerShadow"
          operator="in"
          result="innerBevel"
        />
        <feComposite in="innerBevel" in2="SourceGraphic" operator="over" />
      </filter>

      {/* Gradient definitions */}
      <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4F85F6" />
        <stop offset="100%" stopColor="#245CD1" />
      </linearGradient>

      <linearGradient id="blackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#333333" />
        <stop offset="100%" stopColor="#000000" />
      </linearGradient>
    </defs>

    {/* Decorative futuristic circuit lines - black */}
    <g stroke="#000000" strokeOpacity="0.6" strokeWidth="1.5" fill="none">
      <path d="M50 50 L100 50 L120 70 L180 70 L200 90" />
      <path d="M50 250 L80 250 L100 230 L140 230 L160 210 L200 210" />
      <path d="M450 50 L400 50 L380 70 L340 70 L320 90 L280 90" />
      <path d="M450 250 L420 250 L400 230 L360 230 L340 210 L300 210" />
      {/* Circuit nodes - black */}
      <circle cx="100" cy="50" r="3" fill="#000000" />
      <circle cx="120" cy="70" r="3" fill="#000000" />
      <circle cx="180" cy="70" r="3" fill="#000000" />
      <circle cx="100" cy="230" r="3" fill="#000000" />
      <circle cx="160" cy="210" r="3" fill="#000000" />
      <circle cx="380" cy="70" r="3" fill="#000000" />
      <circle cx="340" cy="70" r="3" fill="#000000" />
      <circle cx="400" cy="230" r="3" fill="#000000" />
      <circle cx="340" cy="210" r="3" fill="#000000" />
    </g>

    {/* Central orbit design element - black */}
    <g transform="translate(250, 150)">
      <circle
        cx="0"
        cy="0"
        r="60"
        fill="none"
        stroke="#000000"
        strokeOpacity="0.7"
        strokeWidth="1"
      />
      <circle
        cx="0"
        cy="0"
        r="75"
        fill="none"
        stroke="#000000"
        strokeOpacity="0.6"
        strokeWidth="1"
      />
      <circle
        cx="0"
        cy="0"
        r="90"
        fill="none"
        stroke="#000000"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
    </g>

    {/* Background subtle shadow for text */}
    <text
      x="253"
      y="153"
      fontFamily="'Montserrat', sans-serif"
      fontSize="74"
      fontWeight="900"
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#000000"
      fillOpacity="0.15"
    >
      <tspan>NEXBuy</tspan>
    </text>

    {/* Premium logo text with enhanced styling and effects */}
    <g filter="url(#premium-text-effect)">
      <text
        x="250"
        y="150"
        fontFamily="'Montserrat', sans-serif"
        fontSize="74"
        fontWeight="900"
        textAnchor="middle"
        dominantBaseline="middle"
        letterSpacing="-1"
      >
        {/* NEX with gradient */}
        <tspan fill="url(#blueGradient)">NEX</tspan>
        {/* Buy with gradient and slightly different weight */}
        <tspan fill="url(#blackGradient)" fontWeight="800">
          Buy
        </tspan>
      </text>
    </g>

    {/* Orbiting elements placed AFTER the text so they appear on top */}
    <g transform="translate(250, 150)">
      {/* Orbiting dot - black */}
      <circle cx="60" cy="0" r="6" fill="#000000">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 0 0"
          to="360 0 0"
          dur="8s"
          repeatCount="indefinite"
        />
      </circle>
      {/* Second orbiting dot (opposite direction) - black */}
      <circle cx="0" cy="75" r="4" fill="#000000">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 0 0"
          to="-360 0 0"
          dur="12s"
          repeatCount="indefinite"
        />
      </circle>
      {/* Third orbiting dot - black */}
      <circle cx="90" cy="0" r="3" fill="#000000">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 0 0"
          to="360 0 0"
          dur="15s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
);

export default NexBuyIcon;
