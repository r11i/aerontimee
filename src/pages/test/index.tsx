import Image from 'next/image'
import { Inter } from 'next/font/google'
import Button from '@/components/Button';
import React, { useState } from 'react';
import InputField from '@/components/InputField';
import FlightList from '@/components/FlightList';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripDetail from '@/components/TripDetailList';
import TripHistory from '@/components/TripHistoryList';
import TripInfo from '@/components/TripInfo';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    alert('Button clicked!');
  };

  const dummyFlights = [
    {
      flightNumber: 'ABC123',
      origin: 'New York',
      destination: 'Los Angeles',
      departureTime: '2023-11-09T08:00:00',
      arrivalTime: '2023-11-09T11:00:00',
      airline: 'garudaindonesia',
      status: 'flied'
    },
    {
      flightNumber: 'XYZ789',
      origin: 'London',
      destination: 'Tokyo',
      departureTime: '2023-11-10T15:30:00',
      arrivalTime: '2023-11-11T08:45:00',
      airline: 'garudaindonesia',
      status: 'cancelled'
    },
    // Add more dummy flights as needed
  ];

  const navLinks = [
    { label: 'MyTrips', href: '/mytrips' },
    { label: 'Home', href: '/' },
    { label: 'Login', href: '/login' },
  ];

  const gateChanges = [
    { id: 1, oldGate: 'A1', newGate: 'B2', changeTime: '2023-11-10T12:30:00' },
    { id: 2, oldGate: 'B2', newGate: 'C3', changeTime: '2023-11-10T13:45:00' },
    // Add more gate changes as needed
  ];

  const flightHistory = [
    { id: 2, flightNumber: 'XYZ789', date: '2023-11-11', origin: 'LAX', destination: 'JFK', airline: 'garudaindonesia', time: '08:00'},
    { id: 1, flightNumber: 'ABC123', date: '2023-11-10', origin: 'JFK', destination: 'LAX', airline: 'garudaindonesia', time: '08:00'},
    
    { id: 3, flightNumber: 'DEF456', date: '2023-11-10', origin: 'SFO', destination: 'ORD', airline: 'garudaindonesia', time: '08:00'},
    // Add more flight history entries as needed
  ];

  const dummyTripData = 
    {
      id: 1,
      flightNumber: 'ABC123',
      date: '2023-11-10',
      origin: 'Jakarta',
      destination: 'Singapore',
      airline: 'garudaindonesia',
      time: '08:00 AM',
      status: 'Scheduled',
    }
  
  
  
  return (
    <div>
      <Navbar links={navLinks} navbarStyles="box-border bg-black relative top-0 w-full px-[82px]" linkStyles="text-white flex items-center text-[24px]" />
      <Button className='bg-[#2D2F3D]' label='Register a flight' onClick={handleClick}/>
      <InputField className="" placeholder="Input your flight code..." label="Flight code" value={inputValue} onChange={handleInputChange} />
      <FlightList flights={dummyFlights} />
      <Footer></Footer>
      <TripDetail gateChanges={gateChanges}/>
      <TripHistory flightHistory={flightHistory} />
      <TripInfo tripInfo={dummyTripData} />
    </div>
  )
}
