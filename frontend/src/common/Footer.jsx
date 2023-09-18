import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div className="flex flex-col h-20 w-full px-40 py-0 mt-0 bg-white text-gray-500 font-poppins">
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
          <ul className="flex justify-center gap-5 text-gray-700">
            <li className="text-sm font-bold text-center mr-5">
              <a>English (US) </a>
            </li>

            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={20} />
              </a>
            </li>

            <li>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={20} />
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
