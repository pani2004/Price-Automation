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
    <div>
      <div
        className="bg-[#004989] h-[150px] flex items-center justify-center fixed top-0 left-0 w-full z-10"
      >
        <Navbar />
      </div>
      <div
        className="p-3 mx-auto flex items-center min-h-screen justify-center overflow-hidden"
        style={{
          maxWidth: '1280px',
          marginTop: '150px', // To ensure content is not hidden under the banner
        }}
      >
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-5 text-center text-black">Sign Up</h1>
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
                className="w-full h-full text-lg outline-none text-black bg-transparent border-b border-gray-400 focus:border-blue-500 focus:ring-0"
                style={{ padding: '5px' }}
              />
            </div>
            <div className="relative" style={{ width: '573px' }}>
              <input
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
                className="w-full h-full text-lg outline-none bg-transparent text-black border-b border-gray-400 focus:border-blue-500 focus:ring-0"
                style={{ padding: '5px' }}
              />
            </div>
            <div className="relative" style={{ width: '573px' }}>
              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
                className="w-full h-full text-lg outline-none text-black bg-transparent border-b border-gray-400 focus:border-blue-500 focus:ring-0"
                style={{ padding: '5px' }}
              />
            </div>
            <button
              className="rounded-lg text-base font-semibold text-white"
              style={{
                width: '150px',
                height: '50px',
                backgroundColor: '#004989',
                marginTop: '20px',
              }}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Register'}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="flex gap-2 mt-5 justify-center text-black">
            <p>Don't have an account?</p>
            <Link to="/signin">
              <span className="text-blue-400">Sign in</span>
            </Link>
          </div>
        </div>
        <div
          className="ml-10"
          style={{
            width: '570px',
            height: '550px',
          }}
        >
          <img
            src="/2.png"
            alt="Sign Up Illustration"
            className="w-[527px] h-[336.96px] object-cover rounded-md"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
