import React, { useState } from "react";
import { Link } from "react-scroll";
import { FaSearch } from "react-icons/fa";
import { navlink } from "../utils/navlinks";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [alert, setShowAlert] = useState(false);
  const [isDropdownOpen, setisDropdownopen] = useState(false);
  const navigate = useNavigate();
  const [loggedIn, setloggedIn] = useState(false);

  const itemsStorage = localStorage.getItem("data");

  const userData = JSON.parse(itemsStorage);
  const jwt = sessionStorage.getItem("jwt");

  if (jwt && JSON.stringify(itemsStorage) !== "{}") {
    if (!loggedIn) {
      setloggedIn(true);
    }
  }
  let initials = userData !== null ? userData.email[0].toUpperCase() : "";

  const toggleDropdown = () => {
    setisDropdownopen(!isDropdownOpen);
  };
  const closeDropdown = () => {
    setisDropdownopen(false);
  };

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
      {loggedIn && (
        <div
          className="relative z-10 bg-gray-100 border text-gray-800 text-center text- px-4 py-3 rounded"
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
          <div
            className=" cursor-pointer w-10 h-10 text-white rounded-full bg-black font-light flex justify-center items-center"
            onClick={toggleDropdown}
          >
            {initials}
          </div>

          <div className="relative">
            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-6 w-48 bg-white border rounded-lg shadow-lg pt-2 pb-2 text-sm">
                <ul className="cursor-pointer">
                  <li
                    onClick={() => navigate("/signup")}
                    className="py-2 px-4 hover:bg-gray-100 cursor-pointer font-semibold"
                  >
                    Sign up
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                    Log in
                  </li>
                  <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                    Help Center
                  </li>
                </ul>
              </div>
            )}
            {isDropdownOpen && (
              <div
                className="fixed inset-0 h-full w-full z-10"
                onClick={closeDropdown}
              ></div>
            )}
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
    </div>
  );
};

export default NavBar;
