// components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { HomeIcon, InformationCircleIcon, StarIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="bg-oxford-blue text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">PodPulse</h1>
        <ul className="flex space-x-4 items-center">
          <li className="flex items-center">
            <HomeIcon className="w-5 h-5 mr-1" />
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li className="flex items-center">
            <InformationCircleIcon className="w-5 h-5 mr-1" />
            <Link to="/about" className="hover:text-gray-300">About</Link>
          </li>
          <li className="relative flex items-center">
            <button 
              onClick={toggleDropdown} 
              className="flex items-center space-x-2 hover:text-gray-300"
            >
              <StarIcon className="w-5 h-5 mr-1" />
              <span>Favorites</span>
              <svg 
                className={`w-4 h-4 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-oxford-blue rounded-lg shadow-lg">
                <ul>
                  <li>
                    <Link to="/favorites" className="block px-4 py-2 hover:bg-gray-100">All Favorites</Link>
                  </li>
                
                </ul>
              </div>
            )}
          </li>
        
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

