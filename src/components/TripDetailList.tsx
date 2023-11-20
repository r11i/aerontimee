import React from 'react';
import Image from 'next/image';

interface GateChange {
  id: number;
  old: string;
  new: string;
  status: string;
  timeStamp: string; // Assuming it's a string for simplicity, use Date if working with actual date objects
}

interface TripDetailProps {
  gateChanges: GateChange[];
}

const TripDetail: React.FC<TripDetailProps> = ({ gateChanges }) => {
  return (
      <ul >
        {gateChanges.map((change) => (
          <li key={change.id} className='flex justify-between rounded-[20px] bg-[#C2C3CB] mb-[13px]'>
            <div className='pt-[20px] pb-[20px] pl-[20px]'>
              {change.status === 'ArrTimeChange' || change.status === 'DepTimeChange' ? (
                <Image src="/timechange.png" alt='time' width={95} height={95} />
              ) : change.status === 'Cancellation' ? (
                <Image src="/cancellation.png" alt='cancellation' width={95} height={95} />
              ) : (
                <Image src="/gate.png" alt='gate' width={95} height={95} />
              )}
            </div>
            
            <div className="w-[100%] flex items-center pl-[20px]">
              <div className='w-fit'>
                {change.status === 'Cancellation' ? (
                  <p className='font-[700]'>Flight's Cancelled</p>
                ) : (
                  <p className='font-[700]'>{change.old} → {change.new}</p>
                )}
                <p className='text-[#114A70]'>{getStatusText(change)}</p>
              </div>
              
              
            </div>
            <div className='flex items-center bg-[#2D2F3D] rounded-[20px] right-[0px] text-white px-[20px] font-[700]'>
              {change.timeStamp}
            </div>
          </li>
        ))}
      </ul>
  );
};

const getStatusText = (change: GateChange): string => {
  switch (change.status) {
    case 'ArrTimeChange':
      return 'Arrival Time Change';
    case 'DepTimeChange':
      return 'Departure Time Change';
    case 'GateChange':
      return 'Gate Change';
    case 'Cancellation':
      return 'Cancelled';
    default:
      return '';
  }
};

export default TripDetail;
