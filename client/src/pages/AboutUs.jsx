import React from 'react';
import Navbar from '../components/Navbar'; // Adjust the path based on your file structure

function AboutUs() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%), 
                     linear-gradient(90deg, rgb(30, 30, 47) 12%, rgb(18, 18, 18) 37%, rgb(18, 18, 18) 85%, rgb(43, 43, 79) 100%)`,
        backgroundBlendMode: 'darken',
        backgroundSize: 'cover',
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Content Section */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 p-8">
        {/* Text Section */}
        <div className="flex-1 max-w-2xl text-white">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>
          <p className="text-lg leading-7">
            Welcome to <strong>MarketScout</strong>—where innovation meets smarter procurement.
            <br />
            <br />
            We revolutionize how businesses source and save by delivering real-time price
            benchmarking, actionable insights, and unparalleled transparency. Our mission is simple:
            empower decision-makers, optimize budgets, and create equal opportunities for all
            vendors, big or small.
            <br />
            <br />
            Powered by cutting-edge technology like Redis, and Nginx, we ensure lightning-fast
            performance and seamless scalability. With MarketScout, procurement is no longer a
            hassle—it’s a competitive edge.
            <br />
            <br />
            <em>Simplify. Save. Succeed. Discover MarketScout today!</em>
          </p>
        </div>

        {/* Image Section */}
        <div className="flex-1 max-w-lg">
          <img
            src="/4.png" 
            alt="About Us Illustration"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
