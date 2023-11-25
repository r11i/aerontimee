// FlightListItem.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import FlightListItem from '@/components/FlightListItem';

const mockFlight = {
  flightNumber: 'FL123',
  originAirport: 'JFK',
  destAirport: 'LAX',
  depTime: '10:00 AM',
  arrTime: '1:00 PM',
  airline: 'Example Airways',
  status: 'scheduled',
};

const mockDepartureFlight = {
    flightNumber: 'FL123',
    originAirport: 'CGK',
    destAirport: 'LAX',
    depTime: '10:00 AM',
    arrTime: '1:00 PM',
    airline: 'Example Airways',
    status: 'scheduled',
  };
  
  const mockArrivalFlight = {
    flightNumber: 'FL124',
    originAirport: 'LAX',
    destAirport: 'CGK',
    depTime: '3:00 PM',
    arrTime: '6:00 PM',
    airline: 'Another Airways',
    status: 'scheduled',
  };

describe('FlightListItem', () => {
  it('renders FlightListItem with clickable link when isClickable is true', () => {
      render(<FlightListItem flight={mockFlight} isClickable={true} />);

      const linkElement = screen.getByRole('link');
      expect(linkElement).toBeInTheDocument();
  });

  it('renders FlightListItem without a link when isClickable is false', () => {
      render(<FlightListItem flight={mockFlight} isClickable={false} />);

      const linkElement = screen.queryByRole('link');
      expect(linkElement).toBeNull();
  });

//   Here the assumptions is either of the arrival or departure airport is CGK, because the app is designed for Soekarno Hatta Airport

  it('displays Destination - FlightNumber if the origin airport is CGK', () => {
    render(<FlightListItem flight={mockDepartureFlight} isClickable={true} />);

    const flightNumberAndDestinationAirportElement = screen.getByText(`${mockDepartureFlight.destAirport} - ${mockDepartureFlight.flightNumber}`);
    expect(flightNumberAndDestinationAirportElement).toBeInTheDocument();

  });

  it('displays Origin - FlightNumber if the origin airport is not CGK', () => {
    render(<FlightListItem flight={mockArrivalFlight} isClickable={true} />);

    const flightNumberAndOriginAirportElement = screen.getByText(`${mockArrivalFlight.originAirport} - ${mockArrivalFlight.flightNumber}`);
    expect(flightNumberAndOriginAirportElement).toBeInTheDocument();

  });

  it('displays airline, depTime, and arrTime element correctly', () => {
    render(<FlightListItem flight={mockFlight} isClickable={true} />);

    const airlineElement = screen.getByText(mockFlight.airline);
    const depTimeElement = screen.getByText(mockFlight.depTime);
    const arrTimeElement = screen.getByText(mockFlight.arrTime);

    expect(airlineElement).toBeInTheDocument();
    expect(depTimeElement).toBeInTheDocument();
    expect(arrTimeElement).toBeInTheDocument();
  });


  it('renders correct Departure logo and status for Departure flight', () => {
    render(<FlightListItem flight={mockDepartureFlight} isClickable={true} />);

    const departureLogoElement = screen.getByAltText(/Departure Logo/i); // Update with your alt text pattern
    const statusElement = screen.getByText(/Departure/i); // Update with your expected status text

    expect(departureLogoElement).toBeInTheDocument();
    expect(statusElement).toBeInTheDocument();
  });

  it('renders correct Arrival logo and status for Arrival flight', () => {
    render(<FlightListItem flight={mockArrivalFlight} isClickable={true} />);

    const arrivalLogoElement = screen.getByAltText(/Arrival Logo/i); // Update with your alt text pattern
    const statusElement = screen.getByText(/Arrival/i); // Update with your expected status text

    expect(arrivalLogoElement).toBeInTheDocument();
    expect(statusElement).toBeInTheDocument();
  });

  it('applies correct styling based on flight status', () => {
    render(<FlightListItem flight={mockFlight} isClickable={true} />);

    const statusElement = screen.getByText(mockFlight.status);
    let expectedBackgroundColor;

    switch (mockFlight.status.toLowerCase()) {
      case 'flied':
        expectedBackgroundColor = 'bg-[#1CAB72]';
        break;
      case 'landed':
        expectedBackgroundColor = 'bg-[#656565]';
        break;
      case 'scheduled':
        expectedBackgroundColor = 'bg-yellow-500';
        break;
      case 'cancelled':
        expectedBackgroundColor = 'bg-[#ED3C44]';
        break;
      default:
        expectedBackgroundColor = '';
    }

    expect(statusElement).toHaveStyle({ backgroundColor: expectedBackgroundColor });
  });
});
