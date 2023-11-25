// TripDetail.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import TripDetail from '@/components/TripDetailList';

const mockChanges = [
  {
    id: 1,
    old: 'Gate A',
    new: 'Gate B',
    status: 'GateChange',
    timeStamp: '2023-11-23T10:30:00',
  },
  {
    id: 2,
    old: '10:00 AM',
    new: '11:30 AM',
    status: 'DepTimeChange',
    timeStamp: '2023-11-24T08:45:00',
  },
  {
    id: 3,
    old: '2:00 PM',
    new: '3:30 PM',
    status: 'ArrTimeChange',
    timeStamp: '2023-11-25T12:15:00',
  },
  {
    id: 4,
    old: 'Gate C',
    new: '',
    status: 'Cancellation',
    timeStamp: '2023-11-25T15:00:00',
  },
];

describe('TripDetail', () => {
  it('renders TripDetail component with gate change', () => {
    render(<TripDetail gateChanges={[mockChanges[0]]} />);

    // Check if gate change elements are present
    expect(screen.getByAltText('gate')).toBeInTheDocument();

    // Check if the gate change text is rendered
    expect(screen.getByText('Gate A → Gate B')).toBeInTheDocument();

    // Check if the timestamp is rendered
    expect(screen.getByText('2023-11-23T10:30:00')).toBeInTheDocument();

    // Add more assertions based on your component structure
    // You may want to check for classes, styles, etc.
  });

  it('renders TripDetail component with departure time change', () => {
    render(<TripDetail gateChanges={[mockChanges[1]]} />);

    // Check if departure time change elements are present
    expect(screen.getByAltText('time')).toBeInTheDocument();

    // Check if the departure time change text is rendered
    expect(screen.getByText('Departure Time Change')).toBeInTheDocument();

    // Check if the timestamp is rendered
    expect(screen.getByText('2023-11-24T08:45:00')).toBeInTheDocument();

    // Add more assertions based on your component structure
    // You may want to check for classes, styles, etc.
  });

  it('renders TripDetail component with arrival time change', () => {
    render(<TripDetail gateChanges={[mockChanges[2]]} />);

    // Check if arrival time change elements are present
    expect(screen.getByAltText('time')).toBeInTheDocument();

    // Check if the arrival time change text is rendered
    expect(screen.getByText('Arrival Time Change')).toBeInTheDocument();

    // Check if the timestamp is rendered
    expect(screen.getByText('2023-11-25T12:15:00')).toBeInTheDocument();

    // Add more assertions based on your component structure
    // You may want to check for classes, styles, etc.
  });

  it('renders TripDetail component with cancellation', () => {

    render(<TripDetail gateChanges={[mockChanges[3]]} />);

    // Check if cancellation element is present
    expect(screen.getByAltText('cancellation')).toBeInTheDocument();

    // Check if the Cancelled text is rendered
    expect(screen.getByText('Cancelled')).toBeInTheDocument();

    // Check if the cancellation text is rendered
    expect(screen.getByText('Flight\'s Cancelled')).toBeInTheDocument();

    // Check if the timestamp is rendered
    expect(screen.getByText('2023-11-25T15:00:00')).toBeInTheDocument();

    // Add more assertions based on your component structure
    // You may want to check for classes, styles, etc.
  });

  // Add more test cases as needed
});
