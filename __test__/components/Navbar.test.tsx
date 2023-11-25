// Navbar.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/Navbar';

describe('Navbar', () => {
  const mockProps = {
    image: '/path/to/image.jpg',
    navbarStyles: 'bg-blue-500',
    linkStyles: 'text-white',
    user: { username: 'john_doe' },
    logOut: jest.fn(),
  };

  it('renders Navbar component with correct content and styles', () => {
    render(<Navbar {...mockProps} />);

    expect(screen.getByText('MyTrips')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();

    // Check that my-trips-dropdown is not in the document when showMyTripsDropdown is initially false
    expect(screen.queryByTestId('my-trips-dropdown')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('MyTrips'));

    // Check that my-trips-dropdown is in the document when showMyTripsDropdown is true
    expect(screen.getByTestId('my-trips-dropdown')).toBeInTheDocument();
    expect(screen.getByText('My Trips')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
  });

  it('calls logOut function when Logout link is clicked', () => {
    render(<Navbar {...mockProps} />);

    fireEvent.click(screen.getByText('Logout'));

    expect(mockProps.logOut).toHaveBeenCalled();
  });

  it('renders Login link when user is not logged in', () => {
    render(<Navbar {...mockProps} user={null} />);

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  // Add more test cases as needed
});
