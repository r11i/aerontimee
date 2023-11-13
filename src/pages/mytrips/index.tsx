import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import ScrollBarContainer from '@/components/ScrollBarContainer';
import FlightList from '@/components/FlightList';

function App() {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    alert('Button clicked!');
  };
  const navLinks = [
    { label: 'MyTrips', href: '/mytrips' },
    { label: 'Home', href: '/', image: '/aerontimelogo-black.png' },
    { label: 'Login', href: '/login' },
  ];

  const dummyFlights = [
    {
      flightNumber: 'ABC123',
      origin: 'New York',
      destination: 'Los Angeles',
      departureTime: '2023-11-09T08:00:00',
      arrivalTime: '2023-11-09T11:00:00',
      airline: 'garudaindonesia',
      status: 'flied',
    },
    {
      flightNumber: 'XYZ789',
      origin: 'London',
      destination: 'Tokyo',
      departureTime: '2023-11-10T15:30:00',
      arrivalTime: '2023-11-11T08:45:00',
      airline: 'garudaindonesia',
      status: 'cancelled',
    },
    // Add more dummy flights as needed
  ];

  // Conditionally render based on whether dummyFlights is empty or not
  if (dummyFlights.length > 0) {
    return (
      <>
        <Navbar links={navLinks} navbarStyles="z-[100] box-border relative top-0 w-full px-[82px]" linkStyles="text-black flex items-center text-[24px]" />
        <div>
          <ScrollBarContainer content={<FlightList flights={dummyFlights} />} className='mx-auto' />
        </div>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <Navbar links={navLinks} navbarStyles="z-[100] box-border relative top-0 w-full px-[82px]" linkStyles="text-black flex items-center text-[24px]" />
        <div className='flex items-center'>
          <div className='flex-1'>
            <Image className="pl-[24px]" src="/mytrips-1.png" alt='gambar' width={714} height={902}></Image>
          </div>
          <div className="flex-1 relative">
            <p className='text-[44px] mr-[54px] ml-[61px] font-[700] text-center mb-[56px]'>Currently, You Do Not Have Any Trip Going On</p>
            <div className='absolute px-auto flex w-[100%] justify-center'>
              <Button label='Register A Flight' onClick={handleClick} className='bg-[#2D2F3D] text-white font-[700] mr-[33px]'></Button>
              <Button label='View My Flight History' onClick={handleClick} className='border-[#2D2F3D] border-[3px] border-solid'></Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
