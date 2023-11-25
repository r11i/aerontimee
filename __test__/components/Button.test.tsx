import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from '@/components/Button';
import '@testing-library/jest-dom';

describe('Button Component', () => {
  it('renders button with label', () => {
    const mockOnClick = jest.fn();
    const label = 'Click me';
    
    render(<Button label={label} onClick={mockOnClick} />);

    const buttonElement = screen.getByText(label);
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick handler when button is clicked', () => {
    const mockOnClick = jest.fn();
    const label = 'Click me';

    render(<Button label={label} onClick={mockOnClick} />);

    const buttonElement = screen.getByText(label);
    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies default and custom classes when className is provided', () => {
    const mockOnClick = jest.fn();
    const label = 'Click me';
    const customClassName = 'custom-class';

    render(<Button label={label} onClick={mockOnClick} className={customClassName} />);

    const buttonElement = screen.getByText(label);
    
    // Check if the default classes are present
    expect(buttonElement).toHaveClass('rounded-[15px]');
    expect(buttonElement).toHaveClass('px-[25px]');
    expect(buttonElement).toHaveClass('py-[11px]');
    expect(buttonElement).toHaveClass('text-[14px]');
    expect(buttonElement).toHaveClass('leading-normal');

    // Check if the custom class is present
    expect(buttonElement).toHaveClass(customClassName);
  });
});
