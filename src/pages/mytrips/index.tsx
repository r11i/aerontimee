import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import ScrollBarContainer from '@/components/ScrollBarContainer';
import FlightList from '@/components/FlightList';
import { User } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function App() {
  const formatDateTimeForPostgres = (dateTime: Date) => {
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:00`;
    return formattedDateTime;
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    alert('Button clicked!');
  };

  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();
  const [flightsData, setFlightsData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true)

  const date = new Date();
  const currentTime = formatDateTimeForPostgres(date);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        console.log(user?.id);
        console.log(user?.email);
        if (!user) {
          router.push('/login');
          console.log('helo');
          console.log(user);
          return;
        }
  
        // Fetch flight data only if user is available
        const { data: myTripsData, error: myTripsError } = await supabase
          .from('MyTrips')
          .select('flight')
          .eq('user', user.email)
          // .eq('status', 'Active');
  
        if (myTripsError) {
          console.error(myTripsError);
          return;
        }
  
        const flightIDs = myTripsData.map(row => row.flight);
        console.log('Flight IDs:');
        console.log(flightIDs);
  
        const { data: flightDetails, error: flightDetailsError } = await supabase
          .from('Flight')
          .select('flightNumber, originAirport, destAirport, depTime, arrTime, airline, status')
          .in('flightID', flightIDs)
          .gt('arrTime', currentTime)
  
        if (flightDetailsError) {
          console.error(flightDetailsError);
          return;
        }

        // const { data: flightCancellations, error: flightCancellationsError } = await supabase
        //   .from('Flight')
        //   .select('flightNumber, originAirport, destAirport, depTime, arrTime, airline, status')
        //   .in('flightID', flightIDs)
        //   .eq('status', 'Cancelled')
  
        // if (flightCancellationsError) {
        //   console.error(flightCancellationsError);
        //   return;
        // }

        // if (flightCancellations.length !== 0){ 
        //   for (const flightCancellation of flightCancellations) {
        //     flightDetails.push(flightCancellation);
        //   }
        // }
  
        // Flight data for the specific user
        console.log('Flight Details:');
        console.log(flightDetails);
        for (const flight of flightDetails) {
          updateStatus(flight, currentTime);
        }
        flightDetails.sort((a, b) => new Date(a.depTime).getTime() - new Date(b.depTime).getTime());
        setFlightsData(flightDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  
  const logOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  if(isLoading) 
  return (
  <p className='flex justify-center items-center w-screen h-screen'>
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
  </p>
  )

  if(flightsData.length === 0) 
  return (
    <>
      <Navbar user={user} logOut={logOut} image='/aerontimelogo-black.png' navbarStyles="z-[100] box-border relative top-0 w-full px-[82px]" linkStyles="text-black flex items-center text-[24px]" />
      <div className='flex items-center'>
        <div className='flex-1'>
          <Image className="pl-[24px]" src="/mytrips-1.png" alt='gambar' width={714} height={902}></Image>
        </div>
        <div className="flex-1 relative">
          <p className='text-[44px] mr-[54px] ml-[61px] font-[700] text-center mb-[56px]'>Currently, You Do Not Have Any Trip Going On</p>
          <div className='absolute px-auto flex w-[100%] justify-center'>
            <Link href={'/mytrips/register'}>
              <Button label='Register A Flight' className='bg-[#2D2F3D] text-white font-[700] mr-[33px]'></Button>
            </Link>
            <Link href={'/mytrips/history'}>
              <Button label='View My Flight History' className='border-[#2D2F3D] border-[3px] border-solid'></Button>
            </Link>          
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
  return (
    <>
      <Navbar user={user} logOut={logOut} image='/aerontimelogo-black.png' navbarStyles="z-[100] box-border relative top-0 w-full px-[82px]" linkStyles="text-black flex items-center text-[24px]" />
      <div>
        <ScrollBarContainer content={<FlightList flights={flightsData} isClickable={true} />} className='mx-auto' />
      </div>
      <Footer />
    </>
  );
}
export default App;