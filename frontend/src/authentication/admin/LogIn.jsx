import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white shadow-md rounded-lg w-96 flex flex-col relative"
        onSubmit={handleSubmit}
      >
        <button
          className="absolute top-2 left-4 h-10 w-6  text-gray-800"
          onClick={() => {
            // Handle close button click here
          }}
        >
          <AiOutlineClose />
        </button>
        <p className="text-md font-bold text-center mt-4 pb-2">Log in</p>
        <hr className="w-full border-t border-gray-300 mb-6" />
        <div className="w-full flex flex-col items-start px-6 text-xl font-semibold">
          <div className="flex-col">
            <p className="inline text-gray-700">Welcome back to</p>
            <p className="inline text-[#92c872]"> tirahunt.</p>
          </div>

          <label
            className="block text-gray-700 text-sm font-bold mt-8"
            htmlFor="email"
          ></label>
          <input
            className="text-sm rounded-tr-lg rounded-tl-lg border border-gray-300 w-full py-4 px-3 text-gray-700 "
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-6 w-full flex flex-col items-center px-6">
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor="password"
          ></label>
          <input
            className="font-semibold text-sm rounded-br-lg rounded-bl-lg border-b border-l border-r border-gray-300 w-full py-4 px-3 text-gray-700 "
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="flex flex-col w-full px-6">
          <button
            className="bg-[#92c872] hover:bg-[#6b9b53] active:bg-[#4a6d39] transition-opacity duration-200 hover:opacity-80 active:opacity-60 text-white font-semibold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Log in
          </button>
          <div className="text-gray-700 text-sm mt-8 mb-4 space-x-3 text-start pb-2">
            <p className="inline">Don&apos;t have an account?</p>
            <p className="inline font-semibold border-b-2 border-gray-800 cursor-pointer">
              Sign up
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
