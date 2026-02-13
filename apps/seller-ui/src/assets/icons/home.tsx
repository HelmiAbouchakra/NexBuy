import React from "react";

const DashboardIcon = ({ fill = "currentColor" }: { fill?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="nextui-c-PJLV nextui-c-PJLV-ibxboXQ-css"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 3H11V15H3V3Z M3 17H11V21H3V17Z M13 3H21V9H13V3Z M13 11H21V21H13V11Z"
        fill={fill}
        className="nextui-c-PJLV"
      />
    </svg>
  );
};

export default DashboardIcon;
