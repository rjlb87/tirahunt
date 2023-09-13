import React from "react";
import { FaFacebook, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="flex flex-col h-20 w-full py-10 px-5 mt-10 bg-white text-black">
      <ul className="flex justify-center flex-row gap-5 text-black mt-0 py-8">
        <li className="flex justify-start text-sm">
          <a>
            © 2023 tirahunt, Inc. • Sitemap • Privacy • Your Privacy Choices •
            Destinations{" "}
          </a>
        </li>

        <li className="flex justify-end text-sm font-bold">
          <a>English (US) </a>
          <a>Support & Resources</a>
        </li>

        <li className="text-sm font-bold">
          <a>Support & Resources</a>
        </li>
      </ul>
    </div>
  );
}

export default Footer;
