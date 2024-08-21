import { Link } from 'react-router-dom';
import { useState } from 'react';
import { HomeIcon, StarIcon, DocumentTextIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-oxford-blue text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold hover:text-orange-500">
          PodPulse
        </Link>
        <ul className="flex items-center space-x-6">
          <li className="flex items-center hover:text-orange-500">
            <HomeIcon className="w-5 h-5 mr-1" />
            <Link to="/">Home</Link>
          </li>
          <li className="flex items-center hover:text-orange-500">
            <DocumentTextIcon className="w-5 h-5 mr-1" />
            <Link to="/shows">Show List</Link>
          </li>
          <li className="relative flex items-center group">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 hover:text-orange-500"
            >
              <StarIcon className="w-5 h-5 mr-1" />
              <span>Favorites</span>
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-oxford-blue rounded-lg shadow-lg z-10 group-hover:block hidden">
                <ul>
                  <li>
                    <Link
                      to="/favorites"
                      className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                    >
                      All Favorites
                    </Link>
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