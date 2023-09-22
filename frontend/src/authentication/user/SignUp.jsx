import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { createUsers } from "../../services/UsersService";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formdata) => ({
      ...formdata,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUsers(formData);
      setFormData({ username: "", email: "", password: "" });

      toast.success("Signup successful!", "success");
      navigate('/signin')
    } catch (error) {
      toast.error("Signup failed. Please try again.", "error");
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white shadow-md rounded-lg w-96 flex flex-col relative"
        onSubmit={handleSubmit}
      >
        <button
          className="absolute top-2 right-4 h-10 w-6 text-gray-800"
          onClick={() => {
            // Handle close button click here
          }}
        >
          <AiOutlineClose />
        </button>
        <p className="text-md font-bold text-center mt-4 pb-2">Sign up</p>
        <hr className="w-full border-t border-gray-300 mb-6" />
        <div className="w-full flex flex-col items-start px-6 text-xl font-semibold">
          <div className="flex-col">
            <p className="inline text-gray-700">Welcome back to</p>
            <p className="inline text-[#92c872]"> tirahunt.</p>
          </div>
          <label
            className=" text-gray-700 text-sm font-bold mt-4"
            htmlFor="username"
          ></label>
          <input
            className="text-sm border rounded-tr-lg rounded-tl-lg border-gray-300 w-full py-4 px-3 text-gray-700 "
            id="username"
            type="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <label
            className=" text-gray-700 text-sm font-bold"
            htmlFor="email"
          ></label>
          <input
            className="text-sm border-l border-r border-b   border-gray-300 w-full py-4 px-3 text-gray-700 "
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
            Sign up
          </button>
          <div className="text-gray-700 text-sm mt-8 mb-4 space-x-3 text-center pb-2">
            <p className="inline">Already have an account?</p>
            <p className="inline font-semibold border-b-2 border-gray-800 cursor-pointer">
              Log in
            </p>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
