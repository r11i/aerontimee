import React from 'react';
import Image from 'next/image';

interface FlightHistory {
  id: number;
  flightNumber: string;
  date: string; // Assuming it's a string for simplicity, use Date if working with actual date objects
  origin: string;
  destination: string;
  airline: string;
  time: string,
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
    // Add more airline-image mappings as needed
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
              <li key={flight.id} className='rounded-[20px] bg-[#C2C3CB] flex justify-between mb-[10px]'>
                <div className='pl-[25px] py-[18px]'>
                    {<Image src={airlineImageMap[flight.airline]} alt={`${flight.airline} Logo`} width={104} height={104} />}
                </div>
                <div className='flex items-center'>
                    <div>
                        <p className='text-[28px] font-[700]'>
                            {flight.origin === 'Jakarta'
                            ? `${flight.origin} - ${flight.flightNumber}`
                            : `${flight.destination} - ${flight.flightNumber}`}
                        </p>
                        <p className='text-[20px] font-[400] text-[#114A70]'>
                            {flight.airline}
                        </p>
                    </div>
                    
                </div>
                <div className='px-[31px] py-[43px] text-[36px] font-[600] text-white flex items-center rounded-[20px] bg-[#2D2F3D]'>
                    {flight.time}
                </div>

                {/* <strong>Flight Number:</strong> {flight.flightNumber} <br />
                <strong>Origin:</strong> {flight.origin} <br />
                <strong>Destination:</strong> {flight.destination}
                <strong>Time: </strong> {flight.time}
                <strong>Airline: </strong> {flight.airline} */}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TripHistoryList;
