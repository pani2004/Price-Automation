import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = res.data;
      console.log(data);
      navigate('/signin');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('User already exists');
      } else {
        setError('An error occurred. Please try again.');
      }
      console.error('Error during signup:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="overflow-hidden"
      style={{
        fontFamily: 'SF Pro Display, sans-serif',
        background: `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%), 
                     linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(255, 255, 255) 33%, rgb(105, 105, 204) 66%, rgb(19, 19, 255) 100%), 
                     linear-gradient(90deg, rgb(30, 30, 47) 12%, rgb(18, 18, 18) 37%, rgb(18, 18, 18) 85%, rgb(43, 43, 79) 100%)`,
        backgroundBlendMode: 'darken',
        backgroundSize: '100% 100%',
      }}
    >
      <Navbar />
      <div
        className="p-3 mx-auto flex items-center min-h-screen justify-center overflow-hidden"
        style={{
          maxWidth: '1280px',
        }}
      >
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-5 text-center text-gray-300">Sign Up</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 items-center"
            style={{ width: '100%' }}
          >
            <div className="relative" style={{ width: '573px' }}>
              <input
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
                className="w-full h-full text-lg outline-none bg-transparent border-b border-gray-400 focus:border-blue-500 focus:ring-0"
                style={{ padding: '5px' }}
              />
            </div>
            <div className="relative" style={{ width: '573px' }}>
              <input
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
                className="w-full h-full text-lg outline-none bg-transparent border-b border-gray-400 focus:border-blue-500 focus:ring-0"
                style={{ padding: '5px' }}
              />
            </div>
            <div className="relative" style={{ width: '573px' }}>
              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
                className="w-full h-full text-lg outline-none bg-transparent border-b border-gray-400 focus:border-blue-500 focus:ring-0"
                style={{ padding: '5px' }}
              />
            </div>
            <button
              className="rounded-lg text-base font-semibold"
              style={{
                width: '150px',
                height: '50px',
                backgroundColor: '#FF8C00',
                color: 'black',
                marginTop: '20px',
              }}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Register'}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="flex gap-2 mt-5 justify-center text-white">
            <p>Have an account?</p>
            <Link to="/signin">
              <span className="text-blue-300">Sign in</span>
            </Link>
          </div>
        </div>
        <div
          className="ml-10"
          style={{
            width: '563px',
            height: '532px',
          }}
        >
          <img
            src="/3.png"
            alt="Sign Up Illustration"
            className="w-[563px] h-[532px] object-cover rounded-md"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
