import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function SearchPage() {
  return (
    <div className="w-full flex flex-col min-h-screen justify-between items-center px-4 sm:px-6 lg:px-8 font-sf-display">
      <div
        className=" flex justify-center items-center"
        style={{
          width: '1600px',
          height: '156px',
          backgroundColor: '#004989',
        }}
      >
        <h1 className="text-white font-bold text-center text-2xl sm:text-4xl">
          Find Exactly What You Need
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-10 w-full">
        <Link
          to="/model"
          className="flex flex-col sm:flex-row items-center px-4 w-full sm:w-[514px] hover:scale-110 transition-transform duration-300"
          style={{
            width: '514px',
            height: '100px',
            backgroundColor: 'rgba(0, 73, 137, 0.16)', // Corrected background color
            borderRadius: '20px',
          }}
        >
          <img
            src="/1.3.png"
            alt="Query Image 1"
            className="w-[75px] sm:w-[106px] h-[56px] sm:h-[75px] mb-2 sm:mb-0 sm:mr-4"
          />
          <p
            className="font-sans font-medium text-black text-center sm:text-left text-sm sm:text-base lg:text-lg"
            style={{
              fontFamily: 'Rokkitt, sans-serif',
            }}
          >
            Query based on exact Make/Model of a Product
          </p>
        </Link>
        <Link
          to="/specification"
          className="flex flex-col sm:flex-row items-center px-4 w-full sm:w-[514px] hover:scale-110 transition-transform duration-300"
          style={{
            height: '100px',
            backgroundColor: 'rgba(0, 73, 137, 0.16)',
            borderRadius: '20px',
          }}
        >
          <img
            src="/1.2.png"
            alt="Query Image 2"
            className="w-[60px] sm:w-[69px] h-[60px] sm:h-[72px] mb-2 sm:mb-0 sm:mr-4"
          />
          <p
            className="font-sans font-medium text-black text-center sm:text-left text-sm sm:text-base lg:text-lg"
            style={{
              fontFamily: 'Rokkitt, sans-serif',
            }}
          >
            Query based on Most Relevant Specifications of a Product
          </p>
        </Link>
        <Link
          to="/service"
          className="flex flex-col sm:flex-row items-center px-4 w-full sm:w-[514px] hover:scale-110 transition-transform duration-300"
          style={{
            height: '100px',
            backgroundColor: 'rgba(0, 73, 137, 0.16)',
            borderRadius: '20px',
          }}
        >
          <img
            src="/1.1.png"
            alt="Query Image 3"
            className="w-[75px] sm:w-[106px] h-[56px] sm:h-[75px] mb-2 sm:mb-0 sm:mr-4"
          />
          <p
            className="font-sans font-medium text-black text-center sm:text-left text-sm sm:text-base lg:text-lg"
            style={{
              fontFamily: 'Rokkitt, sans-serif',
            }}
          >
            Query based on Basic Requirements of a Service
          </p>
        </Link>
      </div>
      <div className="w-screen">
        <Footer />
      </div>
    </div>
  );
}

export default SearchPage;
