CREATE DATABASE shortlinkLuRoDb;
USE shortlinkLuRoDb;
CREATE TABLE Users (
    id VARCHAR(36) PRIMARY KEY,  -- Assumindo que o ID será um UUID
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
INSERT INTO Users (id, email, password) VALUES ('1', 'user1@example.com', 'Password1!');
INSERT INTO Users (id, email, password) VALUES ('2', 'user2@example.com', 'Password2@');
