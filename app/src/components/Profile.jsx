import React, { useEffect, useState } from "react";
import CustomAxios from "../utils/axios";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Profile = () => {
  const [uData, setUserData] = useState(null);
  const { id } = useParams();
  const { loggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const userData = async () => {
    try {
      const response = await CustomAxios.get(`/user/profile/${id}`);
      console.log("API Response:", response); 

      if (response) {
        setUserData(response.data);
        toast.success("Successfully fetched User.");
      } else {
        toast.error("User not found.");
      }
    } catch (error) {
      console.error("Fetch Error:", error.message);
      toast.error("Something went wrong.");
    }
  };

  useEffect(() => {
    userData();
  }, []);

  useEffect(() => {
    if (loggedIn === null) return;
    if (!loggedIn) navigate("/login");
  }, [loggedIn]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center px-4">
      {uData ? (
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center space-y-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 text-white flex items-center justify-center text-4xl font-bold shadow-lg">
            {uData.firstName?.charAt(0)}
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            {uData.firstName} {uData.lastName}
          </h1>
          <p className="text-lg text-gray-600">{uData.email}</p>
          <p className="text-sm text-gray-400">User ID: {uData._id}</p>

          <div className="flex justify-center gap-6 pt-4">
            <div>
              <p className="text-lg font-bold text-gray-700">{uData.followers?.length || 0}</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-700">{uData.following?.length || 0}</p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-700">{uData.posts?.length || 0}</p>
              <p className="text-sm text-gray-500">Posts</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-lg font-medium">Loading user profile...</p>
      )}
    </div>
  );
};

export default Profile;
