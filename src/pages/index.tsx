import Image from 'next/image'
import { Inter } from 'next/font/google'
import Button from '../components/Button'
import React, { useState, useEffect } from 'react';
import InputField from '@/components/InputField';
import FlightList from '@/components/FlightList';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripDetail from '@/components/TripDetailList';
import TripHistory from '@/components/TripHistoryList';
import TripInfo from '@/components/TripInfo';
import ScrollBarContainer from '@/components/ScrollBarContainer';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const cookieStore = cookies()
        
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        console.log(user?.id);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const logOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

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

  const navLinks = user
    ? [
        { label: 'MyTrips', href: '/mytrips' },
        { label: 'Home', href: '/' },
        { label: 'Sign Out',  onClick: logOut }, // Adjust the href as needed
      ]
    : [
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
  

    const flightsMockData = [
      // Sample flight data, replace it with your actual flight data
      {
        flightNumber: 'ABC123',
        origin: 'Jakarta',
        destination: 'Singapore',
        departureTime: '10:00 AM',
        arrivalTime: '12:00 PM',
        airline: 'GA',
        status: 'Scheduled',
      },
      // Add more flight data as needed
    ];
    

    
    // const supabase = createServerComponentClient({ cookies: () => cookieStore })
    // const {
    //   data: { user },
    // } = await supabase.auth.getUser()
  
  
  return (
    <div>
      <Navbar links={navLinks} navbarStyles="z-[100] box-border bg-transparent absolute top-0 w-full px-[82px]" linkStyles="text-white flex items-center text-[24px] cursor-pointer" />
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
                  <Button className="bg-[#76B3DD] mr-[32px] font-[700]" label='Get Started' onClick={handleClick}></Button>
                  <Button className='bg-transparent border-solid border-[#76B3DD] border-[3px] text-[#76B3DD] font-[700]' label='See More' onClick={handleClick}></Button>
                </div>
              </div>
              {/* <form action="process_registration.php" method="post">
                <label htmlFor="email">Email</label>
                <input
                  style={{
                    color: 'black',
                    width: '100%',
                    padding: '9px 19px 9px 19px',
                    borderRadius: '10px',
                    display: 'block',
                  }}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Input your email.."
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  style={{
                    marginBottom: '60px',
                    color: 'black',
                    width: '100%',
                    padding: '9px 19px 9px 19px',
                    borderRadius: '10px',
                    display: 'block',
                  }}
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Input your password.."
                  required
                />
                <button
                  type="submit"
                  style={{
                    fontWeight: 'bold',
                    borderRadius: '15px',
                    width: '100%',
                    padding: '11px 25px 11px 25px',
                    backgroundColor: '#76B3DD',
                    cursor: 'pointer',
                  }}
                >
                  Register
                </button>
              </form>
              <p style={{ textAlign: 'center', marginTop: '10px' }}>
                Don't have an account? <a href="/register" style={{ color: '#76B3DD' }}>Sign up</a>
              </p> */}
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
      <ScrollBarContainer content={<FlightList flights={flightsMockData} />} className='mx-auto' />
      <Footer></Footer>
    </div>
  )
}
