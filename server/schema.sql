DROP DATABASE chat;


CREATE DATABASE chat;

 USE chat;

 -- one to many with messages

CREATE TABLE users (
  ID int(11) NOT NULL auto_increment, 
  dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  name varchar(255) NOT NULL,  
  PRIMARY KEY (ID));

 -- one to many with messages

CREATE TABLE rooms (
  ID int(11) NOT NULL auto_increment, 
  dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  name varchar(255), 
  PRIMARY KEY (ID));


CREATE TABLE messages (
  ID int(11) NOT NULL auto_increment, 
  dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  userID int(11), 
  message varchar(255), 
  roomID int(11), PRIMARY KEY (ID),
  FOREIGN KEY (userID) REFERENCES users(ID),
  FOREIGN KEY (roomID) REFERENCES rooms(ID));

--  -- set up mock users

-- INSERT INTO users (name)
-- VALUES ('john');


-- INSERT INTO users (name)
-- VALUES ('link');


-- INSERT INTO users (name)
-- VALUES ('lulzican');

--  -- set up rooms

-- INSERT INTO rooms (name)
-- VALUES ('happy');


-- INSERT INTO rooms (name)
-- VALUES ('smoke');


-- INSERT INTO rooms (name)
-- VALUES ('party');

--  -- setup messages

-- INSERT INTO messages (message, userID, roomID)
-- VALUES ('lulz',
--           (SELECT ID FROM users WHERE name = 'link'),
--           (SELECT ID FROM rooms WHERE name = 'happy'));


-- INSERT INTO messages (message, userID, roomID)
-- VALUES ('hello',
--           (SELECT ID FROM users WHERE name = 'john'),
--           (SELECT ID FROM rooms WHERE name = 'smoke'));


-- INSERT INTO messages (message, userID, roomID)
-- VALUES ('goodbye',
--           (SELECT ID FROM users WHERE name = 'john'),
--           (SELECT ID FROM rooms WHERE name = 'party'));


-- INSERT INTO messages (message, userID, roomID)
-- VALUES ('sure',
--           (SELECT ID FROM users WHERE name = 'lulzican'),
--           (SELECT ID FROM rooms WHERE name = 'party'));

 /* Describe your table here.*/ /* Create other tables and define schemas for them here! */ /*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/