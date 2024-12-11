import React from 'react';
import { Link } from 'react-router-dom'; 
import Footer from '../components/Footer'; 

function SearchPage() {
  return (
    <div
      className="flex flex-col min-h-screen justify-between items-center"
      style={{ width: '1280px', margin: '0 auto' }}
    >
      <h1
        className="font-sans font-bold text-black text-center mt-10 text-3xl"
        style={{
          width: '602px',
          height: '46px',
          fontFamily: 'SF Pro Display, sans-serif',
        }}
      >
        Find Exactly What You Need
      </h1>
      <div className="mt-10 flex flex-wrap justify-center gap-6">
        <Link
          to="/model"
          className="flex items-center px-4"
          style={{
            width: '514px',
            height: '91px',
            backgroundColor: 'rgba(255, 140, 0, 0.16)', 
            borderRadius: '8px',
          }}
        >
          <img
            src="/1.3.png"
            alt="Query Image 1"
            style={{ width: '106px', height: '75px', marginRight: '16px' }}
          />
          <p
            className="font-sans font-medium text-black"
            style={{
              fontFamily: 'SF Pro Display, sans-serif',
            }}
          >
            Query based on exact Make/Model of a Product
          </p>
        </Link>
        <Link
          to="/specification"
          className="flex items-center px-4"
          style={{
            width: '514px',
            height: '91px',
            backgroundColor: 'rgba(255, 140, 0, 0.16)', // Updated with 16% opacity
            borderRadius: '8px',
          }}
        >
          <img
            src="/1.2.png"
            alt="Query Image 2"
            style={{ width: '69px', height: '72px', marginRight: '16px' }}
          />
          <p
            className="font-sans font-medium text-black"
            style={{
              fontFamily: 'SF Pro Display, sans-serif',
            }}
          >
            Query based on Most Relevant Specifications of a Product
          </p>
        </Link>
        <Link
          to="/service"
          className="flex items-center px-4"
          style={{
            width: '514px',
            height: '91px',
            backgroundColor: 'rgba(255, 140, 0, 0.16)',
            borderRadius: '8px',
            marginTop: '16px', 
          }}
        >
          <img
            src="/1.1.png"
            alt="Query Image 3"
            style={{ width: '106px', height: '75px', marginRight: '16px' }}
          />
          <p
            className="font-sans font-medium text-black"
            style={{
              fontFamily: 'SF Pro Display, sans-serif',
            }}
          >
            Query based on Basic Requirements of a Service
          </p>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default SearchPage;



