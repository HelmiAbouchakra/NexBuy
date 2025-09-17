import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const ProfileIcon: React.FC<IconProps> = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Head */}
    <circle
      cx="12"
      cy="8"
      r="4"
      stroke="currentColor"
      strokeWidth="2"
    />
    {/* Shoulders / body */}
    <ellipse
      cx="12"
      cy="19"
      rx="7"
      ry="4"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export default ProfileIcon;
