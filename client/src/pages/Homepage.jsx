import React from 'react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-[#fffcfa] flex flex-col overflow-x-hidden">
      <Navbar />
      <section className="px-6 mt-22 sm:px-12 lg:px-39 flex flex-col-reverse lg:flex-row items-center justify-between flex-grow">
        <div className="text-center lg:text-left">
          <div className="text-[#00000] font-sf-pro text-[28px] sm:text-[32px] lg:text-[36px] leading-[1.4]">
            Get accurate price insights for products and services in 
            <span className="text-[#FF8C00] font-bold"> just a few clicks!</span>
          </div>
          <div className="mt-8 sm:mt-10 text-black font-sf-pro text-[22px] sm:text-[28px] lg:text-[33px] leading-[1.6]">
            Our streamlined platform ensures transparency, fairness, and efficiency in procurement decisions.
            <br />
            <ul className="list-disc pl-6 mt-4">
              <li>Quick Price Comparisons</li>
              <li>Reliable Market Data</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 lg:mt-0 w-full lg:w-[814px] sm:h-[400px] lg:h-[486px] max-w-full overflow-hidden">
          <img
            src="/2.png"
            alt="Hero Image"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      <footer className="w-full h-[71px] bg-[#FF8C00] flex items-center justify-center mt-8">
      </footer>
    </div>
  );
};

export default HomePage;








