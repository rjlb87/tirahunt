// Category.js
import React from "react";
import { categories } from "../utils/category";

const Category = ({ setSelectedCategory, selectedCategory }) => {
  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const isCategorySelected = (category) => {
    return selectedCategory === category;
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 pt-10 mb-8">
      <ul className="flex">
        {categories.map((categoryItem) => (
          <li
            key={categoryItem.name}
            className={`px-8 flex flex-col items-center ${
              isCategorySelected(categoryItem.name) ? "text-[#92c872]" : "text-gray-300"
            } group hover:text-[#92c872]`}
            onClick={() => handleCategoryClick(categoryItem.name)}
          >
            {categoryItem.icon}
            {categoryItem.name}
            {isCategorySelected(categoryItem.name) && (
              <div className="h-0.5 bg-[#92c872] w-full transform scale-x-100 transition-transform ease-in-out duration-300"></div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
