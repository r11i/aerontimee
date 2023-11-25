import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-calendar/dist/Calendar.css';
import { User } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function MyTripsRegister() {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      alert('Button clicked!');
  };
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClientComponentClient();
  const [flightCode, setFlightCode] = useState('');
  const [airline, setAirline] = useState('');
  const [depTime, setDepTime] = useState<Date>();
  const [arrTime, setArrTime] = useState<Date>();
  const [bookingCode, setBookingCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleFlightCodeChange = (newValue: string) => {
    setFlightCode(newValue);
  };
  const handleAirlineChange = (newValue: string) => {
    setAirline(newValue);
  };

  const handleDepTimeChange = (date: Date) => {
    setDepTime(date)
  }

  const handleArrTimeChange = (date: Date) => {
    setArrTime(date)
  }

  const handleBookingCodeChange = (newValue: string) => {
    setBookingCode(newValue)
  }

  const formatDateTimeForPostgres = (dateTime: Date) => {
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:00`;
    return formattedDateTime;
  };

  

  
  const handleAddToMyTrips = () => {
    const date = new Date();
    
    const currentTime = formatDateTimeForPostgres(date);
    
    const formattedDepTime = depTime ? formatDateTimeForPostgres(depTime) : null;

    const formattedArrTime = arrTime ? formatDateTimeForPostgres(arrTime) : null;

    console.log('Formatted Date:', formattedArrTime);

    console.log('Formatted Date:', formattedDepTime);

    if(formattedArrTime != null && formattedDepTime != null) {
      if (new Date(formattedDepTime) < new Date(currentTime)) {
        alert('Departure time must not be less than current time')
        return
      }
      if (new Date(formattedArrTime) < new Date(formattedDepTime)) {
        alert('Arrival time must not be less than departure time')
        return
      }
    }
    
    if (!flightCode) {
      alert ('Please fill the flight code')
      return
    }

    if (!airline) {
      alert('Please fill the airline')
      return
    }

    if (!bookingCode) {
      alert('Please fill the booking code')
      return
    }

    if (!depTime) {
      alert('Please fill the departure time')
      return
    }

    if (!arrTime) {
      alert('Please fill the arrival time')
      return
    }

    supabase
    .from('Flight')
    .select('*')
    .eq('flightNumber', flightCode)
    .eq('airline', airline)
    .eq('depTime', formattedDepTime)
    .eq('arrTime', formattedArrTime)
    .then(({ data, error }) => {
      if (error) {
        console.error(error);
        alert("Error adding trips")
        return
      } else {
        const flightData = data;
        console.log(flightData);

        if (flightData.length === 0){
          alert("Flight Not Found! Make sure to input correct information. Flight number should be written in capital letters and each word in airline should start with capital letter")
          return
        }
        else{
          const flightID = flightData[0].flightID;

          const userEmail = user?.email;

          console.log(userEmail)
          console.log('flightID', flightID)
          console.log('bookingcode', bookingCode)

          supabase
          .from('Passenger')
          .select('*')
          .eq('flight', flightID)
          .eq('bookingcode', bookingCode)
          .then(({ data, error }) => {
            if (error) {
              console.error(error);
              alert('Error adding trip')
              return
            } else {
              const passenger = data;
              console.log('passenger', passenger)
              if (passenger.length === 0) {
                alert("You're not passenger")
                return
              }
              else{ 
                supabase
                  .from('MyTrips')
                  .insert([{ user: userEmail, flight: flightID, status: 'Active' }])
                  .then(({ data, error }) => {
                    if (error) {
                      console.error(error);
                      alert("You've already add the trip")
                      return
                    } else {
                      console.log('Record inserted successfully:', data); 
                      alert("Trip added successfully")    
                      router.refresh()       
                      return
                    }
                  });
              }
            }
          })
        }
      }
    });
  };
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {     
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        console.log(user?.id);
        if (!user){
          router.push('/login')
          console.log('helo')
          console.log(user)
          return
        }
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
        <fieldset style={{borderTop: '2px solid #76B3DD'}} className='px-[183px] py-[70px]'>
            <legend style={{margin: 'auto', paddingLeft: '5%', paddingRight: '5%', fontSize: '36px', fontWeight: '700'}}>Register A Flight</legend>
                <InputField className="mb-[27px]" placeholder="Input your flight code..." label="Flight Code" value={flightCode} onChange={handleFlightCodeChange}/>
                <InputField className="mb-[27px]" placeholder="Input your airline..." label="Airline" value={airline} onChange={handleAirlineChange}/>
                <InputField className="mb-[27px]" placeholder="Input your booking code..." label="Booking Code" value={bookingCode} onChange={handleBookingCodeChange}/>
                <div className='font-bold'>Departure Date and Time</div>
                <div className="px-[19px] py-[9px] mb-[27px] flex border-solid border-[#e5e7eb] border-[2px] rounded-[10px] w-[100%]">
                  <DatePicker
                    className="mr-[35px] w-[100%] "
                    selected={depTime}
                    onChange={handleDepTimeChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    timeCaption="Time"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    placeholderText="Select date and time"
                  />                 
                </div>
                <div className='font-bold'>Arrival Date and Time</div>
                <div className="px-[19px] py-[9px] mb-[27px] flex border-solid border-[#e5e7eb] border-[2px] rounded-[10px] w-[100%]">
                  <DatePicker
                    className="mr-[35px] w-[100%] "
                    selected={arrTime}
                    onChange={handleArrTimeChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={1}
                    timeCaption="Time"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    placeholderText="Select date and time"
                  />                 
                </div>    
                <div className='flex justify-end'>
                    <Link href={'/mytrips'}>
                      <Button className='mr-[33px] font-bold border-[3px] border-solid border-[#2D2F3D] w-[208px]' label='Cancel'></Button>
                    </Link>
                    <Button className='bg-[#2D2F3D] text-white font-bold w-[208px]' label='Add To MyTrips' onClick={handleAddToMyTrips}></Button>   
                </div>
        </fieldset>
        <Footer></Footer>
    </div>
  );
}

export default MyTripsRegister;