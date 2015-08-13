PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS business;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS comments;
CREATE TABLE business(
	id INTEGER PRIMARY KEY autoincrement,
	name VARCHAR,
	image VARCHAR,
	address VARCHAR,
	type VARCHAR,
	website VARCHAR,
	twitter VARCHAR,
	users_id INTEGER,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE users (
	id INTEGER PRIMARY KEY autoincrement,
	username VARCHAR,
	name TEXT,
	image VARCHAR,
	email VARCHAR,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE comments (
	id INTEGER PRIMARY KEY autoincrement,
	comment VARCHAR,
	users_id INTEGER,
	business_id INTEGER,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (users_id) REFERENCES users_id(users),
  FOREIGN KEY (business_id) REFERENCES business_id(business) 
);