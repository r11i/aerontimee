import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Flight {
  flightNumber: string;
  originAirport: string;
  destAirport: string;
  depTime: string;
  arrTime: string;
  airline: string;
  status: string;
}

interface FlightListItemProps {
  flight: Flight;
  isClickable: boolean;
}

const departureLogo = '/departure.png';
const arrivalLogo = '/arrival.png';

const airlineImageMap: Record<string, string> = {
    'garudaindonesia': '/garudaindonesia.png',
};

const FlightListItem: React.FC<FlightListItemProps> = ({ flight, isClickable }) => {
    // const airlineImage = airlineImageMap[flight.airline];
    const airlineImage = '/garudaindonesia.png';
    const isDeparture = flight.originAirport === 'CGK';
    const status = isDeparture ? 'Departure' : 'Arrival';
    const logo = isDeparture ? departureLogo : arrivalLogo;
    const getStatusColorClass = (status: string): string => {
      switch (status.toLowerCase()) {
        case 'flied':
          return 'bg-[#1CAB72]'; // Adjust the shade based on your design
        case 'landed':
          return 'bg-[#656565]'; // Adjust the shade based on your design
        case 'scheduled':
          return 'bg-yellow-500'; // Adjust the shade based on your design
        case 'cancelled':
          return 'bg-[#ED3C44]'; // Adjust the shade based on your design
        default:
          return ''; // Default background color if status is not recognized
      }
    };
    
    if (isClickable){
      return (
        <Link href={{ pathname: '/mytrips/detail', query: { flightNumber: flight.flightNumber, depTime: flight.depTime } }}>
          <li className='mx-[0px] bg-[#C2C3CB] rounded-[20px] mb-[20px] px-[39px] py-[35px] '>
            <div className='flex justify-between'> 
              <div>
                <div  className='flex'>
                  {airlineImage && <Image src={airlineImage} alt={`${flight.airline} Logo`} width={104} height={104}/>}
                  <div className='ml-[33px]'>
                    {/* <strong className='text-[32px] text[#2D2F3D]'>{flight.origin} - {flight.destination}</strong> <br /> */}
                    <strong className='text-[32px] text[#2D2F3D]'>
                      {flight.originAirport !== 'CGK' ? `${flight.originAirport} - ${flight.flightNumber}` : `${flight.destAirport} - ${flight.flightNumber}`}
                    </strong>
                    <br />
                    <strong className='text-[24px] text-[#114A70] font-[400]'>{flight.airline}</strong>
                  </div>
                </div>
              </div>
              <div className='w-[20%]'>
                <div className='mb-[30px] block'>
                  {logo && <Image className=" float-left" src={logo} alt={`${status} Logo`} width={34} height={34}/>} 
                  <strong className='text-[24px] float-right text-[#114A70]'>{status}</strong><br />
                </div>
                <div className={`capitalize clear-both rounded-[40px] text-[24px] text-center text-white px-[18px] py-[10px] ${getStatusColorClass(flight.status)}`} >
                  {flight.status}
                </div>
              </div>
            </div>
            <div className='mx-auto mt-[20px] w-[90%] h-[20px] rounded-[20px] bg-white'><div className='rounded-[50%] bg-black h-[100%] w-[3%]'></div></div>
            <div className='flex justify-between mt-[10px]'>
              <p>{flight.depTime}</p>
              <p>{flight.arrTime}</p>
            </div>
          </li>
        </Link>
      );
    }
    else{
      return (    
        <li className='mx-[0px] bg-[#C2C3CB] rounded-[20px] mb-[20px] px-[39px] py-[35px] '>
          <div className='flex justify-between'> 
            <div>
              <div  className='flex'>
                {airlineImage && <Image src={airlineImage} alt={`${flight.airline} Logo`} width={104} height={104}/>}
                <div className='ml-[33px]'>
                  {/* <strong className='text-[32px] text[#2D2F3D]'>{flight.origin} - {flight.destination}</strong> <br /> */}
                  <strong className='text-[32px] text[#2D2F3D]'>
                    {flight.originAirport !== 'CGK' ? `${flight.originAirport} - ${flight.flightNumber}` : `${flight.destAirport} - ${flight.flightNumber}`}
                  </strong>
                  <br />
                  <strong className='text-[24px] text-[#114A70] font-[400]'>{flight.airline}</strong>
                </div>
              </div>
            </div>
            <div className='w-[20%]'>
              <div className='mb-[30px] block'>
                {logo && <Image className=" float-left" src={logo} alt={`${status} Logo`} width={34} height={34}/>} 
                <strong className='text-[24px] float-right text-[#114A70]'>{status}</strong><br />
              </div>
              <div className={`capitalize clear-both rounded-[40px] text-[24px] text-center text-white px-[18px] py-[10px] ${getStatusColorClass(flight.status)}`} >
                {flight.status}
              </div>
            </div>
          </div>
          <div className='mx-auto mt-[20px] w-[90%] h-[20px] rounded-[20px] bg-white'><div className='rounded-[50%] bg-black h-[100%] w-[3%]'></div></div>
          <div className='flex justify-between mt-[10px]'>
            <p>{flight.depTime}</p>
            <p>{flight.arrTime}</p>
          </div>
        </li>
      );
    }
  };

export default FlightListItem;
