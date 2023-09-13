import React from "react";

function Footer() {
  return (
    <div className="flex flex-col h-20 w-full py-10 px-5 mt-10 bg-white text-gray-500 font-poppins">
      <div className="flex justify-between">
        <ul className="flex flex-row gap-5 text-black mt-0 py-8">
          <li className="text-sm">
            <a>
              © 2023 tirahunt, Inc. • Sitemap • Privacy • Your Privacy Choices •
              Destinations{" "}
            </a>
          </li>
        </ul>
        <div className="flex items-center ">
          <ul className="flex justify-evenly text-gray-700">
            <li className="text-sm font-bold text-center mr-5">
              <a>English (US) </a>
            </li>

            <li className="text-sm font-bold">
              <a>Support & Resources</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
