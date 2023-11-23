import Image from 'next/image'
import { Inter } from 'next/font/google'
import Button from '../components/Button'
import React, { useState, useEffect } from 'react';
import FlightList from '@/components/FlightList';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollBarContainer from '@/components/ScrollBarContainer';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const formatDateTimeForPostgres = (dateTime: Date) => {
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:00`;
    return formattedDateTime;
  };
  const formatInitialDateTimeForPostgres = (dateTime: Date) => {
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');

    const formattedDateTime = `${year}-${month}-${day}T00:00:00`;
    return formattedDateTime;
  };
  const date = new Date();
  const initialTime = formatInitialDateTimeForPostgres(date);
  const currentTime = formatDateTimeForPostgres(date);
  date.setDate(date.getDate()+1)
  const nextDay = formatInitialDateTimeForPostgres(date);
  const [user, setUser] = useState<User | null>(null);
  const [flightsData, setFlightsData] = useState<any[]>([]);
  const [selectedAirline, setSelectedAirline] = useState<string | null>(null);
  const [clickedAirline, setClickedAirline] = useState<string | null>(null);
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  function updateStatus(flight: any, currentTime: any) {
    const currTime = new Date(currentTime);
    const arrTime = new Date(flight.arrTime);
    const depTime = new Date(flight.depTime);
  
    if (flight.status !== "Cancelled") {
      if (currTime > arrTime) {
        flight.status = "Landed";
      } else if (currTime < depTime) {
        flight.status = "Scheduled";
      } else {
        flight.status = "Flied";
      }
    }
  }
  const handleAirlineClick = (airline: string) => {
    // setClickedAirline(airline === clickedAirline ? null : airline);
    setSelectedAirline(airline === selectedAirline ? null : airline);
  };
  const handleOriginClick = (origin: string) => {
    setSelectedOrigin(origin === selectedOrigin ? null : origin);
  };
  
  const handleDestinationClick = (destination: string) => {
    setSelectedDestination(destination === selectedDestination ? null : destination);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        console.log(user?.id);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    const fetchFlightsData = async () => {
      try {
        // const currentTime = '';
        console.log(currentTime)
        // Use 'from' method to select data from the 'flight' table
        const { data, error } = await supabase.from('Flight').
                                               select('flightNumber,originAirport,destAirport,depTime,arrTime,airline,status').
                                               gt('depTime', initialTime).
                                               lt('depTime', nextDay)
        if (error) {
          throw error;
        }
        console.log('before update',data)

        for (const flight of data) {
          updateStatus(flight, currentTime);
        }
        console.log('after update',data)
        data.sort((a, b) => new Date(a.depTime).getTime() - new Date(b.depTime).getTime());
        setFlightsData(data || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching flight data:', error);
        setIsLoading(false);
      }
    };
    fetchUserData();
    fetchFlightsData(); 
  }, []);

  const logOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    alert('Button clicked!');
  };

  const filterByAirline = (flight: any) => !selectedAirline || flight.airline === selectedAirline;
  const filterByOrigin = (flight: any) => !selectedOrigin || flight.originAirport === selectedOrigin;
  const filterByDestination = (flight: any) => !selectedDestination || flight.destAirport === selectedDestination;
  
  if(isLoading) 
    return (
    <p className='flex justify-center items-center w-screen h-screen'>
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    </p>
    )
  
  return (
    <div>
      <Navbar user={user} logOut={logOut} image='/aerontimelogo.png' navbarStyles="z-[100] box-border bg-transparent absolute top-0 w-full px-[82px]" linkStyles="text-white flex items-center text-[24px] cursor-pointer" />
      <div style={{ color: 'white', position: 'relative', height: '100vh', width: '100%', marginBottom: '80px'}}>
        <div style={{ width: '65%', height: '100vh', right: '0', position: 'absolute' }}>
          <div style={{ position: 'relative', height: '100vh' }}>
            <Image
              alt='gambar'
              style={{ position: 'absolute', width: '100%', height: '100%' }}
              src="/Vector7.png"
              height={862}
              width={1002}
            />
            <div
              style={{
                top: '50%',
                transform: 'translate(0%, -50%)',
                left: '40%',
                zIndex: 1,
                position: 'absolute',
                width: '50%',
                height: 'fit-content',
              }}
            >
              <div style={{ marginBottom: '50px' }}>
                <p style={{ fontSize: '48px', color: '#FFFFFF', fontWeight: 'bold', textAlign: 'right' }}>TRACK YOUR FLIGHT</p>
                <p style={{ fontSize: '18px', textAlign: 'right' }}>Experience the ultimate convenience of real-time flight tracking with our user-friendly website, ensuring you stay informed about your flight's status every step of the way.</p>
                <div className='flex justify-end mt-[38px]'>
                  <Link href={'/register'}>
                    <Button className="bg-[#76B3DD] mr-[32px] font-[700]" label='Get Started'></Button>
                  </Link>
                  <ScrollLink
                    to="flightData"
                    spy={true}
                    smooth={true}
                    offset={-70} // adjust the offset as needed
                    duration={500}
                  >
                    <Button className='bg-transparent border-solid border-[#76B3DD] border-[3px] text-[#76B3DD] font-[700]' label='See More'></Button>
                  </ScrollLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image alt="gambar" style={{ height: '100vh', position: 'absolute', zIndex: -1 }} src="/homepage.png" width={1075} height={1024} />
        <div style={{ position: 'relative', height: '100vh' }}>
          <div style={{ position: 'absolute', left: '51px', top: '100px' }}>
            <p style={{ fontWeight: 'bold', fontSize: '36px' }}>WELCOME</p>
            <p style={{ fontSize: '48px', fontWeight: 'bold' }}>BACK.</p>
          </div>
        </div>
      </div>
      <div className='flex'>
        <div className='w-[30%]'>
          <p className='text-[32px] font-[600] pl-[35px] pt-[20px] pb-[20px]'>Filter</p>
          <div className='bg-[#2D2F3D] rounded-tl-[0px] rounded-tr-[20px] rounded-bl-[0px] rounded-br-[20px]'>
            <p className='text-[#9ACAE7] font-[600] pl-[35px] pt-[20px] pb-[10px] '>Airlines</p>
            <div className="pl-[35px] pb-[20px] pr-[35px] text-white space-x-2 space-y-2">
              <button onClick={() => handleAirlineClick('Garuda Indonesia')} className={`border rounded-[15px] border-[#76B3DD]  px-3 py-1 ${selectedAirline === 'Garuda Indonesia' ? 'bg-[#76B3DD] font-bold' : ''}`}>Garuda Indonesia</button>
              <button onClick={() => handleAirlineClick('Citilink')} className={`border rounded-[15px] border-[#76B3DD] px-3 py-1 ${selectedAirline === 'Citilink' ? 'bg-[#76B3DD] font-bold' : ''}`}>Citilink</button>
              <button onClick={() => handleAirlineClick('Lion Air')} className={`border rounded-[15px] border-[#76B3DD]  px-3 py-1 ${selectedAirline === 'Lion Air' ? 'bg-[#76B3DD] font-bold' : ''}`}>Lion Air</button>
              <button onClick={() => handleAirlineClick('Batik Air')} className={`border rounded-[15px] border-[#76B3DD] px-3 py-1 ${selectedAirline === 'Batik Air' ? 'bg-[#76B3DD] font-bold' : ''}`}>Batik Air</button>
              <button onClick={() => handleAirlineClick('Sriwijaya Air')} className={`border rounded-[15px] border-[#76B3DD] px-3 py-1 ${selectedAirline === 'Sriwijaya Air' ? 'bg-[#76B3DD] font-bold' : ''}`}>Sriwijaya Air</button>
            </div>
            <p className='text-[#9ACAE7] font-[600] pl-[35px] pt-[20px] pb-[10px] '>Origin</p>
            <div className="pl-[35px] pb-[20px] pr-[35px] text-white space-x-2 space-y-2">
              <button onClick={() => handleOriginClick('CGK')} className={`border rounded-[15px] border-[#76B3DD] px-3 py-1 ${selectedOrigin === 'CGK' ? 'bg-[#76B3DD] font-bold' : ''}`}>CGK</button>
              <button onClick={() => handleOriginClick('BTH')} className={`border rounded-[15px] border-[#76B3DD] px-3 py-1 ${selectedOrigin === 'BTH' ? 'bg-[#76B3DD] font-bold' : ''}`}>BTH</button>
              {/* Add more buttons for origins as needed */}
            </div>

            <p className='text-[#9ACAE7] font-[600] pl-[35px] pt-[20px] pb-[10px] '>Destination</p>
            <div className="pl-[35px] pb-[20px] pr-[35px] text-white space-x-2 space-y-2">
              <button onClick={() => handleDestinationClick('CGK')} className={`border rounded-[15px] border-[#76B3DD] px-3 py-1 ${selectedDestination === 'CGK' ? 'bg-[#76B3DD] font-bold' : ''}`}>CGK</button>
              <button onClick={() => handleDestinationClick('BTH')} className={`border rounded-[15px] border-[#76B3DD] px-3 py-1 ${selectedDestination === 'BTH' ? 'bg-[#76B3DD] font-bold' : ''}`}>BTH</button>
              {/* Add more buttons for destinations as needed */}
            </div>
          </div>
        </div>
        <div id='flightData' className='w-[70%] pl-[20px]'>
          {/* <ScrollBarContainer content={<FlightList flights={flightsData} isClickable={false}/>} className='w-full mx-auto' /> */}
          {/* <ScrollBarContainer
            content={<FlightList flights={flightsData.filter(flight => !selectedAirline || flight.airline === selectedAirline)} isClickable={false} />}
            className='w-full mx-auto'
          /> */}
          <ScrollBarContainer
            content={
              <FlightList
                flights={flightsData.filter(
                  (flight) => filterByAirline(flight) && filterByOrigin(flight) && filterByDestination(flight)
                )}
                isClickable={false}
              />
            }
            className='w-full mx-auto'
          />
        </div>
      </div>
      
      
      <Footer></Footer>
    </div>
  )
}