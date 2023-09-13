import React, { useState } from "react";
import { Link } from "react-scroll";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { navlink } from "../utils/navlinks";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [alert, setShowAlert] = useState(false);

  const handleShow = () => {
    setShowAlert(!alert);
    console.log("napindot mo na");
  };

  const handleCloseNav = () => {
    if (nav) {
      setNav(false);
    }
  };

  return (
    <div>
      {!alert && (
        <div
          className="relative z-10 bg-gray-300 border text-gray-800 text-center text- px-4 py-3 rounded"
          role="alert"
        >
          <div>
            <span className="block sm:inline">Hey, </span>
            <span className="block sm:inline font-semibold">
              Where are you going?
            </span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <button onClick={handleShow}>
                <svg
                  className="fill-current h-6 w-6 text-gray-800"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </button>
            </span>
          </div>
        </div>
      )}

      <div className="relative flex justify-between items-center w-full h-[92px] px-4 bg-white border nav">
        <div className="flex items-center ml-4 pt-4">
          <Link to="Home" smooth={true} duration={500} onClick={handleCloseNav}>
            <button>
              <h1 className="text-3xl font-bold text-[#92c872] pl-8 pb-4">
                tirahunt.
              </h1>
            </button>
          </Link>
        </div>
        {/* Search bar */}
        <div className="flex-grow flex justify-center">
          <div className="relative left-36 mr-20">
            <input
              type="text"
              placeholder="Manila"
              className="pl-6 h-12 w-full pr-16 rounded-full border shadow-md"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 h-full flex items-center">
              <button className="bg-[#92c872] text-white rounded-full p-2">
                <FaSearch size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-end space-x-4 text-gray-800 pr-10">
          <a className="hidden md:inline" href="#">
            Become a host
          </a>

          <svg
            className="h-6 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
          {/* tirahunt login/signup icon */}
          <div className="flex space-x-2 border rounded-full p-2">
            <svg
              className="h-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className="h-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Mobile navigation */}
        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer pr-4 z-10 text-gray-700 md:hidden"
        >
          {nav ? "✕" : "☰"}
        </div>
        {nav && (
          <ul className="flex flex-col absolute top-0 left-0 w-full h-screen bg-white">
            {navlink.map(({ id, link }) => (
              <li
                key={id}
                className="px-3 cursor-pointer font-medium text-black"
              >
                <Link
                  activeClass="active"
                  to={link}
                  spy={true}
                  smooth={true}
                  duration={500}
                  s
                  onClick={handleCloseNav}
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavBar;
