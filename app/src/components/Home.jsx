import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAxios from "../utils/axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await CustomAxios.get("/post");
      setPosts(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow sticky top-0 z-50">
        <h1 className="text-3xl font-bold text-gray-800">Pixelle</h1>
        <button
          onClick={() => navigate("/createPost")}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-5 py-2 rounded-xl font-semibold shadow transition"
        >
          + Create Post
        </button>
      </nav>

      {/* Pinterest Layout */}
      <div className="p-6 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="break-inside-avoid overflow-hidden rounded-2xl shadow-lg bg-white transition duration-300 hover:shadow-2xl"
          >
            <img
              className="w-full object-cover rounded-t-2xl"
              src={post.image}
              alt={post.title}
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600">{post.description}</p>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <a
                href={post.image}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md"
              >
                View
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
