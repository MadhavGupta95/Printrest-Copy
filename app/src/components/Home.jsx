import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAxios from "../utils/axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const lastImageRef = useRef(null);
  const observer = useRef(null);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await CustomAxios.get(`/post?_pageNumber=${pageNumber}`);
      if (res.data.length === 0) {
        console.log("All posts loaded");
        setAllLoaded(true);
        return;
      }
      setPosts((prev) => [...prev, ...res.data]); //_ because we dont want to remove the previous data (also spreading res.data because it is also an array)
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, [pageNumber]);

  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    if (allLoaded) return;
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNumber((prevNumber) => prevNumber + 1);
      }
    });
    if (lastImageRef.current) observer.current.observe(lastImageRef.current);
  }, [posts, loading]);

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
            ref={index === posts.length - 1 ? lastImageRef : null}
            key={index}
            className="relative group break-inside-avoid overflow-hidden rounded-2xl shadow-lg bg-white transition duration-300 hover:shadow-2xl cursor-pointer"
            onClick={() => navigate(`/viewImage/${post._id}`)} // assumes each post has a unique _id
          >
            <img
              className="w-full object-cover rounded-2xl group-hover:opacity-60 transition-opacity duration-300"
              src={post.image}
              alt={post.title}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="backdrop-blur-md bg-white/30 text-gray-900 text-lg font-semibold px-6 py-2 rounded-full shadow-lg border border-white/40">
                View the image
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
