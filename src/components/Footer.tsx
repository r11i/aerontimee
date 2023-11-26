import React from 'react';
import Image from 'next/image';
import Button from './Button';
import Link from 'next/link';

// interface FooterProps {
//   Text: string;
// }

const Footer: React.FC = () => {
  return (
    <>
        <footer className="relative">
            <Image src="/footer.png" alt='footer' width={1440} height={467} className="w-[100%]"/>
            {/* <p className="absolute left-[72px] top-[182px] text-sm text-gray-600">{Text}</p> */}
            <div className='absolute left-[72px] top-[162px] max-[1176px]:left-[25px] max-[1176px]:top-[120px] max-[922px]:top-[100px] max-[752px]:top-[80px] max-[620px]:top-[60px] max-[418px]:top-[40px]'>
                <Image src="/aerontimelogo.png" alt='logo' width={128} height={42} className='max-[1000px]:w-[100px] max-[752px]:w-[80px] max-[547px]:w-[40px]'/>
                <p className='mb-[20px] text-[20px] text-white font-[600] max-[862px]:text-[13px] max-[670px]:mb-[10px] max-[547px]:text-[8px] max-[547px]:mb-[5px]'>Track Your Flight</p>
                <Link href={'/register'}>
                  <Button label='Get Started' className='mb-[39px] text-white bg-[#76B3DD] font-[700] max-[1000px]:mb-[19px] max-[1000px]:px-[20px] max-[1000px]:py-[5px] max-[670px]:mb-[9px] max-[547px]:text-[8px] max-[547px]:px-[10px] max-[547px]:py-[5px] max-[547px]:mb-[5px]'></Button>
                </Link>
                <div className='flex text-white max-[862px]:text-[13px] max-[547px]:text-[8px]'>
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
