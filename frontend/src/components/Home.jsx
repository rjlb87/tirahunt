import React from "react";
import { cards } from "../utils/cards";

function Home() {
  return (
    <div className="max-w-6xl mx-auto h-fit my-20">
      <div className="flex flex-col justify-center ">
        <ul className="grid grid-cols-4">
          {cards.map(
            ({
              id,
              description,
              location,
              price,
              image,
              person,
              bedrooms,
              bathRoom,
              livingRoom,
              rating,
            }) => (
              <li
                className="ml-4 border-2 shadow-md shadow-gray-500 my-4 border-gray-100 rounded-md"
                key={id}
              >
                <li>
                  <img className="rounded-lg" src={image} alt="image" />
                </li>
                <div className="px-4 py-4">
                  <li className="font-semibold text-lg">
                    {location}
                    <span className="ml-20">{rating}</span>
                  </li>
                  <li className="text-gray-300">{description}</li>
                  <li>{person}</li>
                  <li>{bedrooms}</li>
                  <li>{bathRoom}</li>
                  <li>{livingRoom}</li>
                  <li className="font-semibold text-md ">{price}</li>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default Home;
