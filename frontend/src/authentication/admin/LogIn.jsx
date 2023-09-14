import React, { useState } from "react";

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
        className="bg-white shadow-md rounded-lg py-6 w-96 flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <p className="text-md font-semibold mb-4">Log in</p>
        <hr className="w-full border-t border-gray-300 mb-6" />
        <div className="w-full flex flex-col items-start px-6">
          <p className="text-xl"> Welcome back to</p>
          <p className="text-xl inline"> tirahunt.</p>
          <label
            className="block text-gray-700 text-sm font-bold mt-8"
            htmlFor="email"
          ></label>
          <input
            className=" text-sm rounded-tr rounded-tl border border-gray-300 w-full py-2 px-3 text-gray-700 "
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
            className=" text-sm rounded-br rounded-bl border border-gray-300 w-full py-2 px-3 text-gray-700 "
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="flex items-center justify-between w-full px-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
