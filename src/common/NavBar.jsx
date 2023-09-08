import React, { useState } from "react";
import { Link } from "react-scroll";

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      link: "Home",
    },
    {
      id: 2,
      link: "About",
    },
    // {
    //   id: 3,
    //   link: "Skills",
    // },
    // {
    //   id: 4,
    //   link: "Experience",
    // },
    // {
    //   id: 5,
    //   link: "Projects",
    // },
    {
      id: 6,
      link: "Contact",
    },
  ];

  const handleCloseNav = () => {
    if (nav) {
      setNav(false);
    }
  };

  return (
    <div className="z-50 fixed flex justify-between items-center w-full h-20 px-4 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg  nav ">
      <div className="flex items-center ml-4 pt-4">
        <Link to="Home" smooth={true} duration={500} onClick={handleCloseNav}>
          <button>
            <h1 className="text-3xl font-bold text-white pl-8" name="Home">
              airbnb
            </h1>
          </button>
        </Link>
      </div>
      <ul className="hidden md:flex">
        {links.map(({ id, link }) => (
          <li
            key={id}
            className="px-3 cursor-pointer font-medium text-white hover:scale-105 hover:text-white link-underline"
          >
            <Link
              activeClass="active"
              to={link}
              spy={true}
              smooth={true}
              duration={500} // set duration to 0
              onClick={handleCloseNav}
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-[#03b1fc]  md:hidden"
      >
        {/* {nav ? <FaTimes size={20} /> : <FaBars size={20} />} */}
      </div>

      {nav && (
        <ul className="flex flex-col justify-start absolute top-0 left-0 w-full h-screen bg-black pl-8">
          <div className="fixed flex justify-between items-center w-full h-20 px-4 bg-black white nav">
            {/* <div className="flex items-center ml-4 pt-4">
              <h1 className="text-4xl font-bold text-white  ">rj.</h1>
            </div> */}
          </div>
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-4 text-2xl text-[#03b1fc] pt-8  text-center"
            >
              <Link
                activeClass="active"
                to={link}
                spy={true}
                smooth={true}
                duration={0} // set duration to 0
                onClick={handleCloseNav}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavBar;
