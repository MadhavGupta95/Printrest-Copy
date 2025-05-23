import React, { useState } from "react";
import CustomAxios from "../../utils/axios";
import toast from "react-hot-toast";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await CustomAxios.post("/auth/forgot-password", { email });
      if (!email) {
        return toast.error("Type your email");
      }
      if (res.success) {
        toast.success("Email sent successfully");
        console.log(res);
        setMessage(
          "Check your email for the link to reset your password. If it doesn't appear within a few minutes, check your spam folder."
        );
        return;
      } else {
        toast.error(res.message);
      }
      // console.log(res);
      //   setMessage(
      //     "Check your email for the link to reset your password. If it doesn't appear within a few minutes, check your spam folder."
      //   );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <section class="bg-gray-50 white:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 white:text-white"
          >
            <img
              class="w-8 h-8 mr-2"
              src="https://www.svgrepo.com/show/276264/pokeball-pokemon.svg"
              alt="logo"
            />
            Pixelle
          </a>
          <div class="w-full bg-white rounded-lg shadow white:border md:mt-0 sm:max-w-md xl:p-0 white:bg-gray-800 white:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl white:text-white">
                Forgot your password?
              </h1>
              {message && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {message}{" "}
                </div>
              )}
              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-blue-500 white:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  class="w-full bg-yellow-300 text-blue bg-primary-400 hover:bg-blue-300 focus:ring-2 focus:outline-none focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center white:bg-primary-600 white:hover:bg-primary-700 white:focus:ring-primary-800 transition ease-in-out"
                >
                  Send reset email
                </button>
                <p class="text-sm font-light text-gray-500 white:text-gray-400">
                  Dont have an account?{" "}
                  <a
                    href="/signup"
                    class="font-medium text-primary-600 hover:underline white:text-primary-500"
                  >
                    Sign up here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
