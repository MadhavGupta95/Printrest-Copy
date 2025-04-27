import React, { useState } from "react";
import CustomAxios from "../../utils/axios";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await CustomAxios.post("/auth/forgot-password", { email });
      console.log(res);
      setMessage(
        "Check your email for the link to reset your password. If it doesn't appear within a few minutes, check your spam folder."
      );
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
                Reset Password
              </h1>
              {message && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {message}{" "}
                </div>
              )}
              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    for="Currentpassword"
                    class="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                  >
                    Current password
                  </label>
                  <input
                    onChange={(e) => setpassword(e.target.value)}
                    type="Currentpassword"
                    name="Currentpassword"
                    id="Currentpassword"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-blue-500 white:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="Newpassword"
                    class="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                  >
                    New password
                  </label>
                  <input
                    onChange={(e) => setpassword(e.target.value)}
                    type="Newpassword"
                    name="Newpassword"
                    id="Newpassword"
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
                Reset password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
