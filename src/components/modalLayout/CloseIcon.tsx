import React, { MouseEvent } from 'react';

interface Props {
  closeModal: (e: MouseEvent) => void;
}

const CloseIcon = ({ closeModal }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="close-icon"
      viewBox="0 0 512 512"
      onClick={closeModal}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M368 368L144 144M368 144L144 368"
      />
    </svg>
  );
};

export default CloseIcon;
