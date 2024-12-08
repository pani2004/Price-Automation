<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
=======
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
>>>>>>> cddf838e00b671d0b22299979d984f549f23997d

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  // Close navbar when clicking outside
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
<<<<<<< HEAD
    <nav
      ref={navRef}
      className="w-[85%] sm:w-full max-w-[769px] h-[50px] sm:h-[71.16px] bg-black px-4 py-2 mx-auto flex items-center justify-between rounded-[40px] mt-4 sm:px-[32.11px] sm:py-[24.08px] sm:rounded-[81px] sm:mt-8 z-10"
    >
=======
    <nav className="w-full max-w-[769px] h-[71.16px] bg-black px-[32.11px] py-[24.08px] flex items-center justify-between mx-auto rounded-[81px] mt-5 z-10">
>>>>>>> cddf838e00b671d0b22299979d984f549f23997d
      <div className="text-white text-[19.27px] font-inter">Market Scout</div>
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
<<<<<<< HEAD
      <div
        className={`flex flex-col lg:flex-row lg:space-x-8 ${
          isOpen
            ? 'absolute top-[71.16px] left-0 w-full bg-black px-6 py-8 items-center justify-center z-20'
            : 'hidden lg:flex'
        }`}
      >
        <a
          href="#home"
=======
      <div className={`flex-col lg:flex-row lg:flex lg:space-x-8 ${isOpen ? 'absolute top-[71.16px] left-0 w-full bg-black px-6 py-8 items-center justify-center z-20' : 'hidden lg:flex'}`}>
        <Link
          to="/"
>>>>>>> cddf838e00b671d0b22299979d984f549f23997d
          className="text-[#FF8C00] text-[19.27px] font-inter hover:underline hover:text-white transition duration-200"
        >
          Home
        </Link>
        <Link
          to="#about"
          className="text-white text-[19.27px] font-inter hover:underline hover:text-[#FF8C00] transition duration-200"
        >
          About
        </Link>
        <Link
          to="/signin"
          className="text-white text-[19.27px] font-inter hover:underline hover:text-[#FF8C00] transition duration-200"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;







