// TripInfo.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import TripInfo from '@/components/TripInfo';

const mockTripInfo = {
  flightID: 1,
  flightNumber: 'ABC123',
  depTime: '10:00 AM',
  arrTime: '12:30 PM',
  originAirport: 'CGK',
  destAirport: 'JFK',
  airline: 'Garuda Indonesia',
  status: 'Scheduled',
};

describe('TripInfo', () => {
  it('renders TripInfo component with correct trip information for departure', () => {
    render(<TripInfo tripInfo={mockTripInfo} />);

    // Check if elements related to departure are present
    expect(screen.getByAltText('Garuda Indonesia Logo')).toBeInTheDocument();
    expect(screen.getByAltText('departure')).toBeInTheDocument();
    expect(screen.getByText('Garuda Indonesia')).toBeInTheDocument();
    expect(screen.getByText('JFK - ABC123')).toBeInTheDocument();
    expect(screen.getByText('Departure')).toBeInTheDocument();
    expect(screen.getByText('Scheduled')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('12:30 PM')).toBeInTheDocument();
  });

  it('renders TripInfo component with correct trip information for arrival', () => {
    const arrivalTripInfo = {
      ...mockTripInfo,
      originAirport: 'LAX',
      destAirport: 'CGK',
      status: 'Landed',
    };

    render(<TripInfo tripInfo={arrivalTripInfo} />);

    // Check if elements related to arrival are present
    expect(screen.getByAltText('Garuda Indonesia Logo')).toBeInTheDocument();
    expect(screen.getByAltText('arrival')).toBeInTheDocument();
    expect(screen.getByText('Garuda Indonesia')).toBeInTheDocument();
    expect(screen.getByText('LAX - ABC123')).toBeInTheDocument();
    expect(screen.getByText('Arrival')).toBeInTheDocument();
    expect(screen.getByText('Landed')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('12:30 PM')).toBeInTheDocument();
  });

  it('renders TripInfo component with correct background color for "flied" status', () => {
    mockTripInfo.status = 'Flied';
    render(<TripInfo tripInfo={mockTripInfo} />);
    const statusElement = screen.getByText('Flied');
    expect(statusElement).toHaveClass('bg-[#1CAB72]');
  });

  it('renders TripInfo component with correct background color for "landed" status', () => {
    mockTripInfo.status = 'Landed';
    render(<TripInfo tripInfo={mockTripInfo} />);
    const statusElement = screen.getByText('Landed');
    expect(statusElement).toHaveClass('bg-[#656565]');
  });

  it('renders TripInfo component with correct background color for "scheduled" status', () => {
    mockTripInfo.status = 'Scheduled';
    render(<TripInfo tripInfo={mockTripInfo} />);
    const statusElement = screen.getByText('Scheduled');
    expect(statusElement).toHaveClass('bg-yellow-500');
  });

  it('renders TripInfo component with correct background color for "cancelled" status', () => {
    mockTripInfo.status = 'Cancelled';
    render(<TripInfo tripInfo={mockTripInfo} />);
    const statusElement = screen.getByText('Cancelled');
    expect(statusElement).toHaveClass('bg-[#ED3C44]');
  });

  // Add more test cases as needed
});
