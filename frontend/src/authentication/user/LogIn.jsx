import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { userLogIn } from "../../services/LogInServices";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      userLogIn(formData).then((res) => {
        if (JSON.stringify(res) !== "{}" && res !== undefined) {
          console.log(res);
          sessionStorage.setItem("jwt", res[0].jwt);
          localStorage.setItem("data", JSON.stringify(res[1]));
          const data = localStorage.getItem("data");
          if (data) {
            console.log("Fetch Data ", JSON.parse(data));
          }
          const loginSuccess = true;

          if (loginSuccess) {
            toast.success("Login successful!", "success");
          }
          navigate("/");
        } else {
          toast.error("Incorrect password");
        }
      });
    } catch (error) {
      console.error("Login failed. Please check your credentials.", error);
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
          onClick={() => {}}
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
            className="text-gray-700 text-sm font-bold mt-4"
            htmlFor="email"
          ></label>
          <input
            className="text-sm border rounded-tr-lg rounded-tl-lg border-gray-300 w-full py-4 px-3 text-gray-700"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <label
            className="text-gray-700 text-sm font-bold"
            htmlFor="password"
          ></label>
          <div className="relative w-full">
            <input
              className="font-semibold text-sm rounded-br-lg rounded-bl-lg border border-gray-300 w-full py-4 px-3 text-gray-700"
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <button
              className="absolute top-2 right-0 h-10 w-10 text-gray-800"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye size={18} />}
            </button>
          </div>
        </div>
        <div className="mb-6 w-full flex flex-col items-center px-6 mt-4">
          <button
            className="bg-[#92c872] hover:bg-[#6b9b53] active:bg-[#4a6d39] transition-opacity duration-200 hover:opacity-80 active:opacity-60 text-white font-semibold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Log in
          </button>
          <div className="text-gray-700 text-sm mt-8 mb-4 space-x-3 text-center pb-2">
            <p className="inline">Don&apos;t have an account?</p>
            <p
              className="inline font-semibold border-b-2 border-gray-800 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </p>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
