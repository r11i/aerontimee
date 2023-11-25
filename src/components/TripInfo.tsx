import React from 'react';
import Image from 'next/image';

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

interface TripInfoProps {
  tripInfo: FlightInfo | null;
}

const airlineImageMap: Record<string, string> = {
    'garudaindonesia': '/garudaindonesia.png',
    // Add more airline-image mappings as needed
};

const getStatusColorClass = (status: string | undefined): string => {
    switch (status?.toLowerCase()) {
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

const TripInfo: React.FC<TripInfoProps> = ({ tripInfo }) => {
  return (
      <div className='bg-[#2D2F3D] rounded-[20px] text-white py-[27px] px-[34px] w-[100%]'>
        <div className='flex justify-between'>
            <div className='flex items-center'>
                <div>
                    {/* <div className='mb-[25px] text-[32px] font-[700]'>
                        {tripInfo.date}
                    </div> */}
                    <div className='flex items-center'>
                        <div className='mr-[45px]'>
                            {<Image src={airlineImageMap['garudaindonesia']} alt={`${tripInfo?.airline} Logo`} width={104} height={104} />}
                        </div>
                        <div>
                            <p>{tripInfo?.airline}</p>
                            <p>{tripInfo?.originAirport === 'CGK'
                                ? `${tripInfo?.destAirport} - ${tripInfo?.flightNumber}`
                                : `${tripInfo?.originAirport} - ${tripInfo?.flightNumber}`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center'>
                <div>
                    <div className='flex justify-center'>
                        <div>
                            {tripInfo?.originAirport === 'CGK'
                            ? (<Image src="/departure.png"  alt='departure' width={32} height={32}/>)
                            : (<Image src="/arrival.png"  alt='arrival' width={32} height={32}/>)}
                        </div>
                        <p className='font-[600] text-[20px]'>
                            {tripInfo?.originAirport === 'CGK'
                            ? `Departure`
                            : `Arrival`}
                        </p>
                    </div>
                    <div className={`mb-[19px] text-[20px] font-[400] rounded-[20px] px-[54px] py-[4px] ${getStatusColorClass(tripInfo?.status)}`}>
                        {tripInfo?.status}
                    </div>
                    <div className='flex mb-[9px] pl-[25%]'>
                        <Image src="/baggage.png" alt='baggage' width={12} height={17}></Image>
                        <p className='ml-[8px] text-[14px] font-[400]'>Baggage</p>
                    </div>
                    <div className='flex mb-[9px] pl-[25%]'>
                        <Image src="/usb.png" alt='usb' width={17} height={17}></Image>
                        <p className='ml-[8px] text-[14px] font-[400]'>USB Available</p>
                    </div>
                    <div className='flex mb-[9px] pl-[25%]'>
                        <Image src="/meal.png" alt='meal' width={19} height={8}></Image>
                        <p className='ml-[8px] text-[14px] font-[400]'>Meal</p>
                    </div>
                    <div className='flex pl-[25%]'>
                        <Image src="/entertainment.png" alt='entertainment' width={21} height={16}></Image>
                        <p className='ml-[8px] text-[14px] font-[400]'>Entertainment</p>
                    </div>
                </div>

            </div>
        </div>
        <div className='mt-[22px] w-[95%] mx-auto bg-[#76B3DD40] h-[14px] rounded-[15px]'>

        </div>
        <div className='flex justify-between'>
            <p>{tripInfo?.depTime}</p>
            <p>{tripInfo?.arrTime}</p>
        </div>

      </div>
  );
};

export default TripInfo;
