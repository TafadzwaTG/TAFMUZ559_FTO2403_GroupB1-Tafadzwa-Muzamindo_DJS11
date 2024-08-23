import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { HomeIcon, StarIcon, DocumentTextIcon, ChevronDownIcon, CalendarIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-oxford-blue text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold hover:text-orange-500 transition duration-300">
          PodPulse
        </Link>
        <ul className="flex items-center space-x-6">
          <NavItem to="/" icon={<HomeIcon className="w-5 h-5 mr-2" />} text="Home" />
          <NavItem to="/shows" icon={<DocumentTextIcon className="w-5 h-5 mr-2" />} text="Show List" />
          <NavItem to="/season-view" icon={<CalendarIcon className="w-5 h-5 mr-2" />} text="Season View" />
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 hover:text-orange-500 transition duration-300 focus:outline-none"
            >
              <StarIcon className="w-5 h-5 mr-2" />
              <span>Favorites</span>
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-oxford-blue rounded-lg shadow-lg z-10">
                <ul>
                  <li>
                    <Link
                      to="/favorites"
                      className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-300"
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

const NavItem = ({ to, icon, text }) => (
  <li>
    <Link
      to={to}
      className="flex items-center hover:text-orange-500 transition duration-300 px-3 py-2 rounded-lg hover:bg-oxford-blue-700"
    >
      {icon}
      {text}
    </Link>
  </li>
);

export default Navbar;
