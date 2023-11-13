import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import ScrollBarContainer from '@/components/ScrollBarContainer';
import TripHistoryList from '@/components/TripHistoryList';

function App() {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      alert('Button clicked!');
  };
  const navLinks = [
    { label: 'MyTrips', href: '/mytrips' },
    { label: 'Home', href: '/', image: '/aerontimelogo-black.png' },
    { label: 'Login', href: '/login' },
  ];

  const flightHistory = [
    { id: 2, flightNumber: 'XYZ789', date: '2023-11-11', origin: 'LAX', destination: 'JFK', airline: 'garudaindonesia', time: '08:00'},
    { id: 1, flightNumber: 'ABC123', date: '2023-11-10', origin: 'JFK', destination: 'LAX', airline: 'garudaindonesia', time: '08:00'},
    
    { id: 3, flightNumber: 'DEF456', date: '2023-11-10', origin: 'SFO', destination: 'ORD', airline: 'garudaindonesia', time: '08:00'},
    { id: 4, flightNumber: 'DEF456', date: '2023-11-10', origin: 'SFO', destination: 'ORD', airline: 'garudaindonesia', time: '08:00'},
    { id: 5, flightNumber: 'DEF456', date: '2023-11-10', origin: 'SFO', destination: 'ORD', airline: 'garudaindonesia', time: '08:00'},
    { id: 6, flightNumber: 'DEF456', date: '2023-11-10', origin: 'SFO', destination: 'ORD', airline: 'garudaindonesia', time: '08:00'},
    { id: 7, flightNumber: 'DEF456', date: '2023-11-10', origin: 'SFO', destination: 'ORD', airline: 'garudaindonesia', time: '08:00'},
    // Add more flight history entries as needed
  ];
  return (
    <>
        <Navbar links={navLinks} navbarStyles="z-[100] box-border relative top-0 w-full px-[82px]" linkStyles="text-black flex items-center text-[24px]" />
        <div className='flex items-center'>
            <div className='flex-1'>
                <Image className="pl-[24px]" src="/mytripshistory.png" alt='gambar' width={714} height={902}></Image>
            </div>
            <div className="flex-1 relative">
              {flightHistory.length > 0 ? (
                <ScrollBarContainer content={<TripHistoryList flightHistory={flightHistory} />} className='mx-auto' />
              ) : (
                <p className='text-[44px] mr-[54px] ml-[61px] font-[700] text-center mb-[56px]'>Currently, You Do Not Have Any Past Trip</p>
              )}
            </div>
        </div>
        <Footer></Footer>
    </>
  );
}

export default App;