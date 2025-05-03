import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CustomAxios from "../../utils/axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loggedIn === null) return;
    if (!loggedIn) navigate("/login");
  }, [loggedIn]);

  const handlePreview = (e) => {
    const file = e.target.files[0];
    const filereader = new FileReader();
    filereader.onload = () => {
      setImagePreview(filereader.result);
      setImage(file);
    };
    filereader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      if (!title || !description || !image)
        throw new Error("Please fill all the fields");
      const formData = new FormData();
      
      formData.append("image", image); //^ image is the file that user has uploaded, it is not the base64 data, it is only used for (preview)
      formData.append("title", title);
      formData.append("description", description);
      console.log(formData);
      
      const { data } = await CustomAxios.post("/post", formData, {});
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full sm:w-3/4 py-6 px-4 sm:px-8 transition-all duration-300 bg-white rounded-xl shadow-lg"
    >
      <h2 className="text-4xl font-extrabold mb-6 text-indigo-700 underline decoration-yellow-400 decoration-4">
        New Post
      </h2>

      <div className="space-y-12">
        <div className="border-b border-gray-300 pb-12">
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-800"
              >
                Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-md ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 sm:max-w-md transition-all">
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    className="block flex-1 border-0 bg-transparent py-2 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Enter a title for your post"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-800"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  name="description"
                  placeholder="Write a description for your post."
                  rows={3}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-md ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm p-2"
                  defaultValue={""}
                />
              </div>
            </div>

            {imagePreview ? (
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Preview
                </label>
                <div className="mt-2 w-full h-auto flex justify-center rounded-lg border border-dashed border-gray-400 px-6 py-4 bg-gray-50">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="rounded-md max-h-64 object-contain transition-transform hover:scale-105 duration-300"
                  />
                </div>
              </div>
            ) : (
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Photo
                </label>
                <div className="mt-3 flex items-center gap-x-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="m8 8 4-4 4 4"
                      stroke="#ffbf00"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 4v12M19 17v.6c0 1.33-1.07 2.4-2.4 2.4H7.4C6.07 20 5 18.93 5 17.6V17"
                      stroke="#ffbf00"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    accept="image/*"
                    onChange={handlePreview}
                    className="sr-only"
                  />
                  <label
                    htmlFor="photo"
                    className="cursor-pointer rounded-md bg-indigo-100 px-3 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-indigo-200 transition-all duration-200"
                  >
                    Upload
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          Cancel
        </button>
        <button
          disabled={isLoading}
          type="submit"
          className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 disabled:opacity-60 transition-all"
        >
          Create
          {isLoading && (
            <svg
              className="animate-spin ml-1 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          )}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
