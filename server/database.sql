CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);


CREATE TABLE images (
  image_id SERIAL PRIMARY KEY,
  image_url VARCHAR(255) NOT NULL,
  mimetype VARCHAR(255) NOT NULL,
  originalname VARCHAR(255) NOT NULL,
  property_id INTEGER REFERENCES property_listings(property_id)
  size VARCHAR(255) NOT NULL
);

CREATE TYPE property_type AS ENUM ('House', 'Apartment', 'Bed Space');


CREATE TABLE property_listings (
    property_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    living_rooms INT NOT NULL,
    property_type property_type NOT NULL,
    image_id INT REFERENCES images(image_id) NOT NULL
);