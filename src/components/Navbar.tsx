import React, { useState } from 'react';
import Image from 'next/image';

interface NavbarProps {
  // links: NavbarLink[];
  image?: string;
  navbarStyles?: string; // Additional Tailwind CSS styles for the navbar
  linkStyles?: string; // Additional Tailwind CSS styles for the links
  user?: any;
  logOut?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({image, navbarStyles, linkStyles, user, logOut }) => {
  
  const [showMyTripsDropdown, setShowMyTripsDropdown] = useState(false);

  const toggleMyTripsDropdown = () => {
    setShowMyTripsDropdown(!showMyTripsDropdown);
  };

  return (
    <nav className={`p-4 ${navbarStyles || ''}`}>
      <ul className="flex justify-between">
        <li className={`${linkStyles || ''} relative`} onClick={toggleMyTripsDropdown}>
          <p className='cursor-pointer'>
            MyTrips
          </p>
          {showMyTripsDropdown && (
            <ul className="absolute bg-[#C2C3CB] text-black p-5 rounded-[20px] rounded-tl-[0px]" style={{ top: '100%', left: '0', width: '300%' }}>
              <li>
                <a href={'/mytrips'}>My Trips</a>
              </li>
              <li>
                <a href={'/mytrips/register'}>Register</a>
              </li>
              <li>
                <a href={'/mytrips/history'}>History</a>
              </li>
            </ul>
          )}
        </li>
          <li className={`${linkStyles || ''}`}>
            <a href={'/'} className="flex items-center">
              {image && <Image src={image} alt="logo" width={212} height={69} />}
            </a>
          </li>
          <li className={`${linkStyles || ''}`}>
            {user ? (
              <a className="flex items-center cursor-pointer" onClick={logOut}>
                Logout
              </a>
            ) : (
              <a href={'/login'} className="flex items-center">
                Login
              </a>
            )}
          </li>
      </ul>
    </nav>
  );
};

export default Navbar;
