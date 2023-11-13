import React from 'react';
import FlightListItem from './FlightListItem';

interface Flight {
    flightNumber: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    airline: string; // New property for airline code
    status: string;
  }

interface FlightListProps{
  flights: Flight[];
}

const FlightList: React.FC<FlightListProps> = ({ flights }) => (
  <ul>
    {flights.map((flight, index) => (
      <FlightListItem key={index} flight={flight} />
    ))}
  </ul>
);

export default FlightList;
