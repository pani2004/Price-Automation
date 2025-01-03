import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const user = useSelector((state) => state.user);  // Access the user info from Redux state
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="w-[85%] sm:w-full max-w-[769px] h-[50px] sm:h-[71.16px] bg-[#DCDCDC;] px-4 py-2 mx-auto flex items-center justify-between rounded-[40px] mt-4 sm:px-[32.11px] sm:py-[24.08px] sm:rounded-[81px] sm:mt-8 z-10"
    
    >
      <Link className="text-black text-[19.27px] font-inter" to="/">Market Scout</Link>
      {/* Hamburger Menu for Mobile */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12h18M3 6h18M3 18h18"></path>
          </svg>
        </button>
      </div>

      <div
        className={`flex flex-col lg:flex-row lg:space-x-8 ${isOpen ? 'absolute top-[71.16px] left-0 w-full bg-black px-6 py-8 items-center justify-center z-20' : 'hidden lg:flex'}`}
      >
        <Link
          to="/"
          className="text-[#6969CC] text-[19.27px] font-inter hover:underline"
          
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-black text-[19.27px] font-inter hover:underline hover:text-[#FF8C00] transition duration-200"
          
        >
          About
        </Link>
        <Link
          to="/signin"
          className="text-black text-[19.27px] font-inter hover:underline hover:text-[#FF8C00] transition duration-200"
        >
          Sign In
        </Link>

        {/* Show user details if logged in */}
        {user && (
          <div className="text-black text-[19.27px] font-inter hover:underline hover:text-[#FF8C00] transition duration-200">
            <Link to="/profile" className="flex items-center">
              <span className="mr-2">Profile</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;








