import React from 'react';
import Image from 'next/image';

interface NavbarLink {
  label: string;
  href?: string;
  image?: string; // Optional image source
  onClick?: () => void; // Optional onClick function
}

interface NavbarProps {
  links: NavbarLink[];
  navbarStyles?: string; // Additional Tailwind CSS styles for the navbar
  linkStyles?: string; // Additional Tailwind CSS styles for the links
}

const Navbar: React.FC<NavbarProps> = ({ links, navbarStyles, linkStyles }) => {
  const handleLinkClick = (onClick?: () => void) => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <nav className={`p-4 ${navbarStyles || ''}`}>
      <ul className="flex justify-between">
        {links.map((link, index) => (
          <li key={index} className={`${linkStyles || ''}`}>
            {index === 1 ? (
              <a href={link.href} className="flex items-center" onClick={() => handleLinkClick(link.onClick)}>
                <Image src={link.image ?? '/aerontimelogo.png'} alt='logo' width={212} height={69}></Image>
              </a>
            ) : (
              <a href={link.href} className="flex items-center" onClick={() => handleLinkClick(link.onClick)}>
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
