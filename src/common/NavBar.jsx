import React, { useState } from "react";
import { Link } from "react-scroll";
import { FaSearch } from 'react-icons/fa';

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const handleCloseNav = () => {
    if (nav) {
      setNav(false);
    }
  };

  return (
    <>
      <div className="bg-gray-100 border text-gray-800 text-center text- px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">Hey, </span>
        <span className="block sm:inline font-semibold">Where are you going?</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg className="fill-current h-6 w-6 text-gray-800" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
        </span>
      </div>

      <div className="z-50 fixed flex justify-between items-center w-full h-[92px] px-4 bg-white border nav ">
        <div className="flex items-center ml-4 pt-4">
          <Link to="Home" smooth={true} duration={500} onClick={handleCloseNav}>
            <button>
              <h1 className="text-3xl font-bold text-[#92c872] pl-8 pb-4">
                tirahunt.
              </h1>
            </button>
          </Link>
        </div>
        <div className="flex-grow flex justify-center"> 
          <div className="relative right-20">
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
      </div>
    </>
  );
};

export default NavBar;
