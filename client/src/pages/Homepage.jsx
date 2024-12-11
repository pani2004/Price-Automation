import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div 
      className="w-full min-h-screen bg-[#fffcfa] flex flex-col overflow-x-hidden overflow-y-hidden"
      style={{ 
         // Prevent text selection and cursor change
        background: `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%), 
                    linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(255, 255, 255) 33%, rgb(105, 105, 204) 66%, rgb(19, 19, 255) 100%), 
                    linear-gradient(90deg, rgb(30, 30, 47) 12%, rgb(18, 18, 18) 37%, rgb(18, 18, 18) 85%, rgb(43, 43, 79) 100%)`,
        backgroundBlendMode: 'darken',
        backgroundSize: '100% 100%',
      }}
    >
      <Navbar />
      <section className="px-6 mt-22 sm:px-12 lg:px-39 flex flex-col-reverse lg:flex-row items-center justify-between flex-grow mt-5">
        <div className="text-center lg:text-left lg:w-1/2 w-full lg:mt-0">
          <div className="text-[#FFFFFF] font-sf-pro text-[28px] sm:text-[32px] lg:text-[36px] leading-[1.4]">
            Get accurate price insights for products and services in 
            <span className="text-[#FF8C00] font-bold"> just a few clicks!</span>
          </div>
          <div className="mt-8 sm:mt-10 text-white font-sf-pro text-[22px] sm:text-[28px] lg:text-[33px] leading-[1.6]">
            Our streamlined platform ensures transparency, fairness, and efficiency in procurement decisions.
            <br />
            <ul className="list-disc pl-6 mt-4">
              <li>Quick Price Comparisons</li>
              <li>Reliable Market Data</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 lg:mt-0 w-full lg:w-1/2 sm:h-[400px] lg:h-[486px] max-w-full overflow-hidden">
          <img
            src="/2.png"
            alt="Hero Image"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;

