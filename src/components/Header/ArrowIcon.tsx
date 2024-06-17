import React from 'react';

// Component to switch between different SVG icons based on state
const ArrowIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return isOpen ?
  (
    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 0L10 5.25031L8.33255 7L5 3.49938L1.66745 7L0 5.25031L5 0Z" fill="#1C1C27" />
    </svg>
  ) : (
    <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 7L0 1.74969L1.66745 0L5 3.50062L8.33255 0L10 1.74969L5 7Z" fill="#1C1C27" />
    </svg>
  );
};

export default ArrowIcon;
