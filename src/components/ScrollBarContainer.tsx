import React from 'react';

interface ScrollBarContainerProps {
  content: React.ReactNode;
  className?: string; // Additional className prop
}

const ScrollBarContainer: React.FC<ScrollBarContainerProps> = ({ content, className }) => {
  // Combine the default class and additional class if provided
  const containerClass = `pr-[25px] h-auto max-h-[855px] w-[90%] overflow-y-scroll overflow-x-hidden scrollbar-container ${className}`;

  return (
    <div className={containerClass}>
      {content}
    </div>
  );
};

export default ScrollBarContainer;