import React from "react";
import { cards } from "../utils/cards";

function Home() {
  return (
    <div className="max-w-6xl mx-auto h-screen my-20">
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
              rating
            }) => (
              <li className="ml-4 border-4 shadow-lg shadow-red-900 my-4 border-gray-300 rounded-md" key={id}>
                <li>
                  <img className="rounded-lg" src={image} alt="image" />
                </li>
                <li>{description}</li>
                <li>{location}</li>
                <li>{price}</li>
                <li>{person}</li>
                <li>{bedrooms}</li>
                <li>{bathRoom}</li>
                <li>{livingRoom}</li>
                <li>{rating}</li>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default Home;
