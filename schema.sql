PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS business;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS users;
CREATE TABLE business(
	id INTEGER PRIMARY KEY autoincrement,
	name VARCHAR,
	address VARCHAR,
	image VARCHAR,
	type VARCHAR,
	votes INTEGER,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE comments (
	id INTEGER PRIMARY KEY autoincrement,
	comment VARCHAR,
	username VARCHAR,
	users_id INTEGER,
	business_id INTEGER,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (users_id) REFERENCES users(id),
  FOREIGN KEY (business_id) REFERENCES business(id)
 
);
CREATE TABLE users (
	id INTEGER PRIMARY KEY autoincrement,
	name TEXT,
	username VARCHAR,
	email VARCHAR,
	image VARCHAR,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
