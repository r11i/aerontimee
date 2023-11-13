import React from 'react';
import Image from 'next/image';
import Button from './Button';

// interface FooterProps {
//   Text: string;
// }

const Footer: React.FC = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    alert('Button clicked!');
  };
  return (
    <>
        <footer className="relative">
            <Image src="/footer.png" alt='footer' width={1440} height={467} />
            {/* <p className="absolute left-[72px] top-[182px] text-sm text-gray-600">{Text}</p> */}
            <div className='absolute left-[72px] top-[162px]'>
                <Image src="/aerontimelogo.png" alt='logo' width={128} height={42}/>
                <p className='mb-[20px] text-[20px] text-white font-[600]'>Track Your Flight</p>
                <Button label='Get Started' onClick={handleClick} className='mb-[39px] text-white bg-[#76B3DD] font-[700]'></Button>
                <div className='flex text-white'>
                    <p className='mr-[17px]'>Contact</p>
                    <p className='mr-[17px]'>Wan Aufa Azis</p>
                    <p className='mr-[17px]'>Khairunnisa Hurun ‘Iin</p>
                    <p className='mr-[17px]'>Richard Haris</p>
                </div>
            </div>
            
        
        </footer>
        <div className='bg-[#76B3DD] w-[100%] h-[19px]'></div>
    </>
  );
};

export default Footer;
