import * as React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

const HeartIcon: React.FC<IconProps> = ({ size = 30, ...props }) => (
  <svg
    fill="none"
    width={size}
    height={size}
    viewBox="-7.2 -7.2 86.40 86.40"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Main Heart Outline */}
    <path
      d="M36.064,64.68c-2.206,0-3.896-1.436-4.976-2.516C28.535,59.611,10.955,38.448,9.6,36.815
         C6.413,33.594,4.66,29.342,4.66,24.832c0-4.542,1.778-8.822,5.007-12.05l0.454-0.454
         c3.228-3.229,7.521-5.007,12.087-5.007c4.565,0,8.858,1.778,12.087,5.007
         c0.074,0.074,0.143,0.154,0.204,0.239c0.002,0,0.579,0.717,1.501,0.717
         c0.966,0,1.399-0.571,1.445-0.636c0.082-0.135,0.147-0.208,0.26-0.32
         c3.229-3.229,7.521-5.007,12.087-5.007c4.566,0,8.859,1.778,12.087,5.007l0.454,0.454
         c3.229,3.228,5.007,7.508,5.007,12.05c0,4.509-1.752,8.759-4.936,11.979
         c-1.353,1.646-18.424,22.416-21.362,25.354c-1.08,1.08-2.771,2.515-4.978,2.515z"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Shine lines (now on the left side) */}
    <path
      d="M14 23c.6-2 2-3.8 3.6-5.2l.3-.3c2.5-2.5 6.1-3.6 9.6-2.7"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M29 18c-.5.4-1 .8-1.5 1.3"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

export default HeartIcon;
