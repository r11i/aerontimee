// InputField.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '@/components/InputField';

describe('InputField', () => {
  const mockProps = {
    label: 'Username',
    value: 'john_doe',
    placeholder: 'Enter your username',
    onChange: jest.fn(),
    className: 'custom-input',
    labelStyle: 'text-blue-500',
  };

  it('renders InputField component with correct label, value, and placeholder', () => {
    render(<InputField {...mockProps} />);

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('john_doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
  });

  it('calls onChange function when input value changes', () => {
    render(<InputField {...mockProps} />);

    const inputElement = screen.getByDisplayValue('john_doe');
    fireEvent.change(inputElement, { target: { value: 'new_value' } });

    expect(mockProps.onChange).toHaveBeenCalledWith('new_value');
  });

  it('applies custom classes to InputField component', () => {
    render(<InputField {...mockProps} />);

    const inputContainer = screen.getByTestId('input-container');
    expect(inputContainer).toHaveClass('custom-input');
  });

  it('applies custom label style to InputField component', () => {
    render(<InputField {...mockProps} />);

    const labelElement = screen.getByText(/Username/i);
    expect(labelElement).toHaveClass('text-blue-500');
  });

  it('updates the value prop when input value changes', () => {
    const { rerender } = render(<InputField {...mockProps} />);

    const inputElement = screen.getByDisplayValue('john_doe');
    fireEvent.change(inputElement, { target: { value: 'new_value' } });

    rerender(<InputField {...mockProps} value='new_value' />);

    expect(screen.getByDisplayValue('new_value')).toBeInTheDocument();
  });
});
