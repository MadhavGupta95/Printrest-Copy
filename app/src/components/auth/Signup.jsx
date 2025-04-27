import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../../redux/actions/auth";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if(token){
      navigate('/')
    }
  }, [token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      signupUser({
        firstName,
        lastName,
        email,
        password,
      })
    );
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
                Create an account
              </h1>
              <form
                onSubmit={handleSubmit}
                class="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    for="firstName"
                    class="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                  >
                    First Name
                  </label>
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter your username"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-blue-500 white:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="lastName"
                    class="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter your lastName"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-blue-500 white:focus:border-blue-500"
                    required=""
                  />
                </div>
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
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-blue-500 white:focus:border-blue-500"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  class="w-full bg-yellow-300 text-blue bg-primary-400 hover:bg-blue-300 focus:ring-2 focus:outline-none focus:ring-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center white:bg-primary-600 white:hover:bg-primary-700 white:focus:ring-primary-800 transition ease-in-out"
                >
                  Sign In
                </button>
                <p class="text-sm font-light text-gray-500 white:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    class="font-medium text-primary-600 hover:underline white:text-primary-500"
                  >
                    Login here
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

export default Signup;
