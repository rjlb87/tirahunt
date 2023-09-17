import React, { useState } from "react";
import { FaHome, FaBuilding, FaBed } from "react-icons/fa";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const isCategorySelected = (category) => {
    return selectedCategory === category;
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <ul className="flex">
        <li
          className={`px-8 flex flex-col items-center ${
            isCategorySelected("house") ? "text-[#92c872]" : "text-gray-300"
          } group hover:text-[#92c872]`}
          onClick={() => handleCategoryClick("house")}
        >
          <FaHome size={24} />
          House
          {isCategorySelected("house") && (
            <div className="h-0.5 bg-[#92c872] w-full transform scale-x-100 transition-transform ease-in-out duration-300"></div>
          )}
        </li>
        <li
          className={`px-8 flex flex-col items-center ${
            isCategorySelected("apartment") ? "text-[#92c872]" : "text-gray-300"
          } group hover:text-[#92c872]`}
          onClick={() => handleCategoryClick("apartment")}
        >
          <FaBuilding size={24} />
          Apartment
          {isCategorySelected("apartment") && (
            <div className="h-0.5 bg-[#92c872] w-full transform scale-x-100 transition-transform ease-in-out duration-300"></div>
          )}
        </li>
        <li
          className={`px-8 flex flex-col items-center ${
            isCategorySelected("bedspace") ? "text-[#92c872]" : "text-gray-300"
          } group hover:text-[#92c872]`}
          onClick={() => handleCategoryClick("bedspace")}
        >
          <FaBed size={24} />
          Bed Space
          {isCategorySelected("bedspace") && (
            <div className="h-0.5 bg-[#92c872] w-full transform scale-x-100 transition-transform ease-in-out duration-300"></div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Category;
