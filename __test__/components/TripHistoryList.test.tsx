// TripHistoryList.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import TripHistoryList from '@/components/TripHistoryList';

const mockFlightHistory = [
  {
    id: 1,
    flightNumber: 'ABC123',
    date: '2023-11-23',
    origin: 'CGK',
    destination: 'JFK',
    airline: 'Garuda Indonesia',
  },
  {
    id: 2,
    flightNumber: 'XYZ789',
    date: '2023-11-24',
    origin: 'LAX', // Origin is not 'CGK'
    destination: 'CGK',
    airline: 'Another Airline',
  },
  // Add more mock flight history data as needed
];

describe('TripHistoryList', () => {
  it('renders TripHistoryList component with flight history when origin is CGK', () => {
    render(<TripHistoryList flightHistory={mockFlightHistory.filter(flight => flight.origin === 'CGK')} />);

    // Check if flight history elements are present
    expect(screen.getByText('2023-11-23')).toBeInTheDocument();
    expect(screen.getByText('Garuda Indonesia')).toBeInTheDocument();

    // Check the rendered flight details based on the origin
    const cgkFlightDetails = screen.getByText('JFK - ABC123');
    expect(cgkFlightDetails).toBeInTheDocument();
  });

  it('renders TripHistoryList component with flight history when origin is not CGK', () => {
    render(<TripHistoryList flightHistory={mockFlightHistory.filter(flight => flight.origin !== 'CGK')} />);

    // Check if flight history elements are present
    expect(screen.getByText('2023-11-24')).toBeInTheDocument();
    expect(screen.getByText('Another Airline')).toBeInTheDocument();

    // Check the rendered flight details based on the origin
    const nonCgkFlightDetails = screen.getByText('LAX - XYZ789');
    expect(nonCgkFlightDetails).toBeInTheDocument();
  });
});
