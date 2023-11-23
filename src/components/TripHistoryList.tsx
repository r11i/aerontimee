import React from 'react';
import Image from 'next/image';

interface FlightHistory {
  id: number;
  flightNumber: string;
  date: string;
  origin: string;
  destination: string;
  airline: string;
}

interface TripHistoryProps {
  flightHistory: FlightHistory[];
}

const groupFlightsByDate = (flightHistory: FlightHistory[]) => {
  const groupedFlights: { [date: string]: FlightHistory[] } = {};

  flightHistory.forEach((flight) => {
    if (groupedFlights[flight.date]) {
      groupedFlights[flight.date].push(flight);
    } else {
      groupedFlights[flight.date] = [flight];
    }
  });

  return groupedFlights;
};

const airlineImageMap: Record<string, string> = {
    'garudaindonesia': '/garudaindonesia.png',
};

const TripHistoryList: React.FC<TripHistoryProps> = ({ flightHistory }) => {
  
  const groupedFlights = groupFlightsByDate(flightHistory);

  return (
    <div>
      {Object.keys(groupedFlights).map((date) => (
        <div key={date}>
          <p className='text-[28px] font-[600] py-[10px]'>{date}</p>
          <ul>
            {groupedFlights[date].map((flight) => (
              <li key={flight.id} className='rounded-[20px] bg-[#C2C3CB] flex  mb-[10px]'>
                <div className='pl-[25px] py-[18px] pr-[25px]'>
                    {<Image src={airlineImageMap['garudaindonesia']} alt={`${'garudaindonesia'} Logo`} width={104} height={104} />}
                </div>
                <div className='flex items-center'>
                    <div>
                        <p className='text-[28px] font-[700]'>
                            {flight.origin === 'CGK'
                            ? `${flight.destination} - ${flight.flightNumber}`
                            : `${flight.origin} - ${flight.flightNumber}`}
                        </p>
                        <p className='text-[20px] font-[400] text-[#114A70]'>
                            {flight.airline}
                        </p>
                    </div>
                    
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TripHistoryList;
