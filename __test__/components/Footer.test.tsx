// Footer.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '@/components/Footer';

jest.mock('next/image', () => ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />);

describe('Footer', () => {
  it('renders Footer component with correct content', () => {
    render(<Footer />);

    // Check if the main content is present
    expect(screen.getByAltText('footer')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('Track Your Flight')).toBeInTheDocument();
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Wan Aufa Azis')).toBeInTheDocument();
    expect(screen.getByText('Khairunnisa Hurun ‘Iin')).toBeInTheDocument();
    expect(screen.getByText('Richard Haris')).toBeInTheDocument();
  });

  it('renders a link to /register with "Get Started" button', () => {
    render(<Footer />);

    const getStartedButton = screen.getByText('Get Started');
    userEvent.click(getStartedButton);

    // Check if the link to /register is present
    expect(screen.getByRole('link', { name: 'Get Started' })).toHaveAttribute('href', '/register');
  });

  // Add more test cases as needed
});
