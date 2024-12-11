import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';
import {  signoutUserStart, signoutUserSuccess, signoutUserFailure } from '../redux/user/userSlice'; // Assuming you have a logout action

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);
  const handleLogout = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await axios.get("/api/signout");
      const data = res.data;
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess());
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  };

  if (!currentUser) {
    return <div>User not logged in</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="text-xl mb-2">Username: {currentUser.data.username}</div>
      <div className="text-xl mb-4">Email: {currentUser.data.email}</div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
