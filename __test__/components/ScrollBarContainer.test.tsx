// ScrollBarContainer.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import ScrollBarContainer from '@/components/ScrollBarContainer';

describe('ScrollBarContainer', () => {
  const mockContent = <div>Mock Content</div>;

  it('renders ScrollBarContainer component with default styles', () => {
    render(<ScrollBarContainer content={mockContent} />);

    const container = screen.getByText(/Mock Content/i);

    expect(container).toBeInTheDocument();
    expect(container.parentElement).toHaveClass('pr-[25px] h-auto max-h-[785px] w-[90%] overflow-y-scroll overflow-x-hidden scrollbar-container');
  });

  it('renders ScrollBarContainer component with additional className', () => {
    render(<ScrollBarContainer content={mockContent} className="custom-class" />);

    const container = screen.getByText(/Mock Content/i);

    expect(container).toBeInTheDocument();
    expect(container.parentElement).toHaveClass('pr-[25px] h-auto max-h-[785px] w-[90%] overflow-y-scroll overflow-x-hidden scrollbar-container custom-class');
  });

  // Add more test cases as needed
});
