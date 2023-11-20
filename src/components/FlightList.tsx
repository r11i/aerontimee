import React from 'react';
import FlightListItem from './FlightListItem';

interface Flight {
  flightNumber: string;
  originAirport: string;
  destAirport: string;
  depTime: string;
  arrTime: string;
  airline: string;
  status: string;
}

interface FlightListProps{
  flights: Flight[];
  isClickable: boolean;
}

const FlightList: React.FC<FlightListProps> = ({ flights, isClickable }) => (
  <ul>
    {flights.map((flight, index) => (
      <FlightListItem key={index} flight={flight} isClickable={isClickable} />
    ))}
  </ul>
);

export default FlightList;
