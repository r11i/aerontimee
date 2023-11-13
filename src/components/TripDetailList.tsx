import React from 'react';
import Image from 'next/image';

interface GateChange {
  id: number;
  newGate: string;
  oldGate: string;
  changeTime: string; // Assuming it's a string for simplicity, use Date if working with actual date objects
}

interface TripDetailProps {
  gateChanges: GateChange[];
}

const TripDetail: React.FC<TripDetailProps> = ({ gateChanges }) => {
  return (
      <ul >
        {gateChanges.map((change) => (
          <li key={change.id} className='flex justify-between rounded-[20px] bg-[#C2C3CB] mb-[13px]'>
            <div className='pt-[20px] pb-[20px] pl-[42px]'>
              <Image src="/gate.png" alt='gate' width={95} height={95}></Image>
            </div>
            
            <div className="flex items-center">
              {change.oldGate} → {change.newGate}
            </div>
            <div className='flex items-center bg-[#2D2F3D] rounded-[20px] right-[0px]'>
              {change.changeTime}
            </div>
          </li>
        ))}
      </ul>
  );
};

export default TripDetail;
