import React from "react";

const Payment = ({ fill }: { fill: string }) => {
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
        d="M3 5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.9 6 10 6.9 10 8V16C10 17.1 10.9 18 12 18H21V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5ZM12 9C12 8.45 12.45 8 13 8H21C21.55 8 22 8.45 22 9V15C22 15.55 21.55 16 21 16H13C12.45 16 12 15.55 12 15V9ZM14.5 12C14.5 13.1 15.4 14 16.5 14C17.6 14 18.5 13.1 18.5 12C18.5 10.9 17.6 10 16.5 10C15.4 10 14.5 10.9 14.5 12Z"
        fill={fill}
      />
    </svg>
  );
};

export default Payment;
