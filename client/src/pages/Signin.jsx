import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Signin() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await axios.post('/api/signin', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = res.data;
      dispatch(signInSuccess(data));
      navigate('/search');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        dispatch(signInFailure('User not found'));
      } else if (error.response && error.response.status === 401) {
        dispatch(signInFailure('Invalid credentials'));
      } else {
        dispatch(signInFailure('An error occurred. Please try again.'));
      }
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col overflow-hidden relative"
      style={{
        background: `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%), 
                     linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(255, 255, 255) 33%, rgb(105, 105, 204) 66%, rgb(19, 19, 255) 100%), 
                     linear-gradient(90deg, rgb(30, 30, 47) 12%, rgb(18, 18, 18) 37%, rgb(18, 18, 18) 85%, rgb(43, 43, 79) 100%)`,
        backgroundBlendMode: 'darken',
        backgroundSize: '100% 100%',
      }}
    >
      <Navbar />
      <div className="flex flex-1">
        <div className="flex justify-start items-center w-1/2 pl-16">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center bg-transparent p-6"
            style={{ width: '572.98px' }}
          >
            <div className="flex flex-col gap-4 mb-6" style={{ width: '572.98px' }}>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  placeholder="email"
                  className="rounded-lg p-4 focus:outline-none "
                  style={{
                    width: '572.98px',
                    height: '98.05px',
                  }}
                  onChange={handleChange}
                />
                <div
                  className="absolute bottom-0 left-0 w-full border-b border-gray-300"
                  style={{ width: '572.98px' }}
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="rounded-lg p-4 focus:outline-none "
                  style={{
                    width: '572.98px',
                    height: '98.05px',
                  }}
                  onChange={handleChange}
                />
                <div
                  className="absolute bottom-0 left-0 w-full border-b border-gray-300"
                  style={{ width: '572.98px' }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="rounded-full text-black font-semibold"
              style={{
                width: '150px',
                height: '50px',
                backgroundColor: '#FF8C00',
                borderRadius: '30px',
              }}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Login'}
            </button>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            <div className="flex gap-2 mt-4">
              <p>Don't have an account?</p>
              <Link to="/signup">
                <span className="text-blue-700">Sign Up</span>
              </Link>
            </div>
          </form>
        </div>

      <div className="flex flex-1 items-center justify-center flex-col lg:flex-row lg:gap-10 p-4">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center bg-transparent p-6"
          style={{ width: '100%', maxWidth: '572.98px' }}
        >
          <div className="flex flex-col gap-4 mb-6 w-full">
            <div className="relative">
              <input
                type="text"
                id="email"
                placeholder="Username"
                className="rounded-lg p-4 focus:outline-none w-full"
                style={{ height: '88.05px' }}
                onChange={handleChange}
              />
              <div className="absolute bottom-0 left-0 w-full border-b border-gray-300" />
            </div>
            <div className="relative">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="rounded-lg p-4 focus:outline-none w-full"
                style={{ height: '88.05px' }}
                onChange={handleChange}
              />
              <div className="absolute bottom-0 left-0 w-full border-b border-gray-300" />
            </div>
          </div>
          <button
            type="submit"
            className="rounded-full text-black font-semibold"
            style={{
              width: '150px',
              height: '50px',
              backgroundColor: '#FF8C00',
              borderRadius: '30px',
            }}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Login'}
          </button>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          <div className="text-white flex gap-2 mt-4">
            <p>Don't have an account?</p>
            <Link to="/signup">
              <span className="text-blue-300">Sign Up</span>
            </Link>
          </div>
        </form>

        {/* Image Section */}
        <div
          className="w-full max-w-lg lg:w-1/2 mt-8 lg:mt-0"
          style={{ minHeightHeight: '800px' }}
        >
          <img
            src="/3.png"
            alt="Placeholder"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signin;
