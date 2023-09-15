CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE property_types (
    type_id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE property_listings (
    property_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    description TEXT NOT NULL,
    location_id INT REFERENCES locations(location_id) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image_data BYTEA,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    living_rooms INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    property_type_id INT REFERENCES property_types(type_id) NOT NULL
);
