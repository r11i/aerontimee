import { useRouter } from 'next/navigation';
// import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import ScrollBarContainer from '@/components/ScrollBarContainer';
import TripDetail from '@/components/TripDetailList';
import Footer from '@/components/Footer';
import TripInfo from '@/components/TripInfo';

interface FlightInfo {
  flightID: number;
  flightNumber: string;
  depTime: string; // Assuming it's a string for simplicity, use Date if working with actual date objects
  arrTime: string;
  originAirport: string;
  destAirport: string;
  airline: string;
  status: string;
}


const MyTripsDetail: React.FC = () => {
  const formatDateTimeForPostgres = (dateTime: Date) => {
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:00`;
    return formattedDateTime;
  };
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
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();
  const [flightInformationChanges, setFlightInformationChanges] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tripData, setTripData] = useState<FlightInfo | null>(null);
  let flightID: any;
  async function getFlightID(flightNumber: any, depTime: any) {
    try {
      const { data, error } = await supabase
        .from('Flight')
        .select('flightID')
        .eq('flightNumber', flightNumber)
        .eq('depTime', depTime);
  
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        flightID = data[0]?.flightID;
        console.log('Flight Number:', flightNumber);
        console.log('Flight ID:', flightID);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function getArrTimeChange(flightid_param: any){  
    let { data, error } = await supabase
    .rpc('getarrtimechanges', {
      flightid_param
    })
    if (error) {
      console.error(error)
      return
    }
    else {
      console.log('getarrtimechanges',data)
      return data
    }
  }

  async function getDepTimeChange(flightid_param: any){  
    let { data, error } = await supabase
    .rpc('getdeptimechanges', {
      flightid_param
    })
    if (error) {
      console.error(error)
      return
    }
    else {
      console.log('getdeptimechanges',data)
      return data
    }
  } 

  async function getGateChange(flightid_param: any){  
    let { data, error } = await supabase
    .rpc('getgatechanges', {
      flightid_param
    })
    if (error) {
      console.error(error)
      return
    }
    else {
      console.log('getgatechanges',data)
      return data
    }
  } 

  async function getFlightCancellations(flightID: any) {
    const { data, error } = await supabase
      .from('FlightInformationChange')
      .select('informationID, timeStamp')
      .eq('flight', flightID)
      .eq('type', 'Cancellation');

    if (error) {
      console.error('Error fetching flight cancellations:', error.message);
      return [];
    }

    // Map the retrieved data to the desired format
    const cancellations = data.map((entry) => ({
      id: entry.informationID,
      old: null,
      new: null,
      status: 'Cancellation',
      timeStamp: entry.timeStamp,
    }));

    return cancellations;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const cookieStore = cookies()
        const searchParams = new URLSearchParams(window.location.search);
        const flightNumber  = searchParams.get('flightNumber');
        const depTime = searchParams.get('depTime');
        
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        console.log(user?.id);
        if (!user){
          router.push('/login')
          console.log('helo')
          console.log(user)
          return
        }

        console.log('flightNumber', flightNumber)

        await getFlightID(flightNumber, depTime);

        const { data } = await supabase
                                .from('Flight')
                                .select('flightID, flightNumber, depTime, arrTime, originAirport, destAirport, airline, status') 
                                .eq('flightID', flightID)
        if (data) {
          updateStatus(data[0], currentTime)
          setTripData(data[0])
          console.log('tripdataa', data[0])
        }
        
        console.log('tripdata',tripData)

        let allInformationChanges: any[] = [];

        const arrTimeChanges = await getArrTimeChange(flightID);
        arrTimeChanges.forEach((arrTimeChange: any) => {
          allInformationChanges.push(arrTimeChange);
        });

        const depTimeChanges = await getDepTimeChange(flightID);
        depTimeChanges.forEach((depTimeChange: any) => {
          allInformationChanges.push(depTimeChange);
        });

        const gateChanges = await getGateChange(flightID);
        gateChanges.forEach((gateChange: any) => {
          allInformationChanges.push(gateChange);
        });

        const cancellations = await getFlightCancellations(flightID);
        cancellations.forEach((cancellation) => {
          allInformationChanges.push(cancellation);
        });

        allInformationChanges.sort((a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());
        
        console.log('allinformationchanges',allInformationChanges);

        setFlightInformationChanges(allInformationChanges);

        setIsLoading(false)
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false)
      }
    };
    fetchUserData();
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
      
  return (
    <div>
      <Navbar user={user} logOut={logOut} image='/aerontimelogo-black.png' navbarStyles="z-[100] box-border relative top-0 w-full px-[82px]" linkStyles="text-black flex items-center text-[24px]" />
      <div className='flex items-center'>
          <div className='flex-1 relative'>
              <Image className="pl-[24px]" src="/mytripsdetail.png" alt='gambar' width={714} height={902}></Image>
              <div className='absolute bottom-[0px] pl-[24px] w-[100%]'>
                <TripInfo tripInfo={tripData} />
              </div>
          </div>
          <div className="flex-1 relative">
            {flightInformationChanges.length > 0 ? (
              <ScrollBarContainer content={<TripDetail gateChanges={flightInformationChanges} />} className='mx-auto' />
            ) : (
              <p className='text-[44px] mr-[54px] ml-[61px] font-[700] text-center mb-[56px]'>Currently, There Are No Informations Changes About The Flight</p>
            )}
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyTripsDetail;