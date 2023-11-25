// FlightList.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import FlightList from '@/components/FlightList';

interface Flight {
  flightNumber: string;
  originAirport: string;
  destAirport: string;
  depTime: string;
  arrTime: string;
  airline: string;
  status: string;
}

const mockFlights: Flight[] = [
  {
    flightNumber: 'FL123',
    originAirport: 'JFK',
    destAirport: 'LAX',
    depTime: '10:00 AM',
    arrTime: '1:00 PM',
    airline: 'Airline',
    status: 'On Time',
  },
  // Add more mock flights as needed
];

describe('FlightList', () => {
  it('renders the FlightList component with the given flights', () => {
    const { container } = render(<FlightList flights={mockFlights} isClickable={true} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the correct number of FlightListItem components', () => {
    const { container } = render(<FlightList flights={mockFlights} isClickable={true} />);
    const flightListItems = container.querySelectorAll('.flight-list-item');
    expect(flightListItems.length).toBe(mockFlights.length);
  });

  it('does not render FlightListItem components when flights array is empty', () => {
    const { container } = render(<FlightList flights={[]} isClickable={true} />);
    const flightListItems = container.querySelectorAll('.flight-list-item');
    expect(flightListItems.length).toBe(0);
  });


  // You can add more tests as needed, such as checking if specific text or elements are present
});
