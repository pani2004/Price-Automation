import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col overflow-x-hidden overflow-y-hidden font-sf-display">
      <div className="bg-[#004989] h-[150px]"> 
        <Navbar />
      </div>
      <section className="px-6  sm:px-12 bg-[#DCDCDC] lg:px-39 flex flex-col-reverse lg:flex-row items-center justify-between flex-grow ">
        <div className="text-center lg:text-left lg:w-1/2 w-full lg:mt-0">
          <div className="text-black text-[28px] sm:text-[32px] lg:text-[36px] leading-[1.4]">
            Get accurate price insights for products and services in 
            <span className="text-[#004989] font-bold"> just a few clicks!</span>
          </div>
          <div className="mt-8 sm:mt-10 text-black text-[22px] sm:text-[28px] lg:text-[33px] leading-[1.6]">
            Our streamlined platform ensures transparency, fairness, and efficiency in procurement decisions.
            <br />
            <ul className="list-disc pl-6 mt-4">
              <li>Quick Price Comparisons</li>
              <li>Reliable Market Data</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 lg:mt-0 w-full lg:w-1/2 flex justify-center">
          <img
            src="/1.png"
            alt="Hero Image"
            className="w-[481px] h-[416px] object-cover"
          />
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default HomePage;



