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
    <div className="w-full min-h-screen bg-white flex flex-col overflow-x-hidden overflow-y-hidden font-sf-display">
      {/* Navbar Section */}
      <div className="bg-[#004989] h-[150px] flex items-center justify-center">
        <Navbar />
      </div>
      <div className="flex flex-1">
        <div className="flex justify-start items-center w-1/2 pl-16">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center bg-transparent p-6"
            style={{ width: '572.98px' }}
          >
            <div className="flex flex-col gap-10 mb-6" style={{ width: '572.98px' }}>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  className="p-4 focus:outline-none focus:border-b-2 focus:border-blue-500 placeholder-gray-500 bg-transparent"
                  style={{
                    width: '100%',
                    height: '40px',
                    borderBottom: '1px solid gray',
                  }}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="p-4 focus:outline-none focus:border-b-2 focus:border-blue-500 placeholder-gray-500 bg-transparent"
                  style={{
                    width: '100%',
                    height: '40px',
                    borderBottom: '1px solid gray',
                  }}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="rounded-full text-white font-semibold"
              style={{
                width: '150px',
                height: '50px',
                backgroundColor: '#004989',
                borderRadius: '30px',
              }}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Login'}
            </button>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            <div className="flex text-xl gap-2 mt-4 text-black">
              <p>Don't have an account?</p>
              <Link to="/signup">
                <span className="text-blue-400">Sign Up</span>
              </Link>
            </div>
          </form>
        </div>

        <div
          className="w-full max-w-lg lg:w-1/2 mt-8 lg:mt-0"
          style={{ minHeightHeight: '800px' }}
        >
          <img
            src="/2.png"
            alt="Placeholder"
            className="w-[527px] h-[336.96px] mt-24 left-40"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signin;
