import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


function App() {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      alert('Button clicked!');
  };
  const [flightCode, setFlightCode] = useState('');
  const [airline, setAirline] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [flightType, setFlightType] = useState('');
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState('');

  const handleFlightCodeChange = (newValue: string) => {
    setFlightCode(newValue);
  };
  const handleAirlineChange = (newValue: string) => {
    setAirline(newValue);
  };
  const handleDayChange = (newValue: string) => {
    setDay(newValue);
  };
  const handleMonthChange = (newValue: string) => {
    setMonth(newValue);
  };
  const handleYearChange = (newValue: string) => {
    setYear(newValue);
  };
  const handleFlightTypeChange = (newValue: string) => {
    setFlightType(newValue);
  };
  const handleDestinationChange = (newValue: string) => {
    setDestination(newValue);
  };
  const handleOriginChange = (newValue: string) => {
    setOrigin(newValue);
  };
  const navLinks = [
    { label: 'MyTrips', href: '/mytrips' },
    { label: 'Home', href: '/', image: '/aerontimelogo-black.png' },
    { label: 'Login', href: '/login' },
  ];
  return (
    <div>
        <Navbar links={navLinks} navbarStyles="z-[100] box-border relative top-0 w-full px-[82px]" linkStyles="text-black flex items-center text-[24px]" />
        <fieldset style={{borderTop: '2px solid #76B3DD'}} className='px-[183px] py-[70px]'>
            <legend style={{margin: 'auto', paddingLeft: '5%', paddingRight: '5%', fontSize: '36px', fontWeight: '700'}}>Register A Flight</legend>
            <form action="POST">
                <InputField className="mb-[27px]" placeholder="Input your flight code..." label="Flight code" value={flightCode} onChange={handleFlightCodeChange}/>
                <InputField className="mb-[27px]" placeholder="Input your airline..." label="Airline" value={airline} onChange={handleAirlineChange}/>
                <div className="mb-[27px] flex">
                    <InputField className="mr-[35px] w-[10%]"  placeholder="Day" label="Day" value={day} onChange={handleDayChange}/>
                    <InputField className="mr-[35px] w-[30%]"  placeholder="Month" label="Month" value={month} onChange={handleMonthChange}/>
                    <InputField className="mr-[35px] w-[30%]"  placeholder="Year" label="Year" value={year} onChange={handleYearChange}/>
                    <Image src="/Calendar.png" alt='calendar' width={59} height={54}/>
                </div>
                <InputField className="mb-[27px]" placeholder="Input your flight type..." label="Flight type" value={flightType} onChange={handleFlightTypeChange}/>
                <InputField className="mb-[27px]" placeholder="Input your destination airport..." label="Destination" value={destination} onChange={handleDestinationChange}/>
                <InputField className="mb-[27px]" placeholder="Input your origin airport..." label="Origin" value={origin} onChange={handleOriginChange}/>
                <div className='flex justify-end'>
                    <Button className='mr-[33px] font-bold border-[3px] border-solid border-[#2D2F3D] w-[208px]' label='Cancel' onClick={handleClick}></Button>
                    <Button className='bg-[#2D2F3D] text-white font-bold w-[208px]' label='Add To MyTrips' onClick={handleClick}></Button>   
                </div>
            </form>
        </fieldset>
        <Footer></Footer>
    </div>
  );
}

export default App;