import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const BagIcon: React.FC<IconProps> = ({ size = 30, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Bag handle */}
    <path
      d="M16 20a16 16 0 0 1 32 0"
      fill="none"
      stroke="black"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Bag body (outlined, white inside, clean shape) */}
    <rect
      x="12"
      y="20"
      width="40"
      height="36"
      rx="6"
      ry="6"
      fill="white"
      stroke="black"
      strokeWidth="4"
    />

    {/* Shine line inside bag (left side) */}
    <path
      d="M20 26 Q18 38 20 50" // a smooth curve inside
      stroke="black"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.5" // lighter for shine effect
    />
  </svg>
);

export default BagIcon;
