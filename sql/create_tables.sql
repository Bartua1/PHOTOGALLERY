SET foreign_key_checks = 0;
DROP TABLE IF EXISTS Rates;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS PhotoCategories;
DROP TABLE IF EXISTS Photos;
DROP TABLE IF EXISTS followingfollowers;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS InappropriateWords;
DROP TABLE IF EXISTS Categories;


CREATE TABLE Users (
	userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	firstName VARCHAR(128) NOT NULL,
	lastName VARCHAR(128) NOT NULL,
	telephone VARCHAR(32) NOT NULL,
	email VARCHAR(128) UNIQUE NOT NULL,
	username VARCHAR(64) UNIQUE NOT NULL,
	password VARCHAR(256) NOT NULL,
	avatarUrl VARCHAR(512) DEFAULT '/images/default_profile.png',
	CONSTRAINT InvalidEmail CHECK (email NOT IN (''))
);

CREATE TABLE Photos (
	photoId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(128) NOT NULL,
	description VARCHAR(512),
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	url VARCHAR(512) NOT NULL,
	visibility VARCHAR(16) NOT NULL,
	userId INT NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users (userId),
	CONSTRAINT ValidVisibility CHECK (visibility in ('Public', 'Private')),
	CONSTRAINT URLCannotBeNull CHECK (url NOT IN ("")),
	CONSTRAINT TitleCannotBeNull CHECK (title NOT IN (""))
);

CREATE TABLE Rates (
	rateId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	rate INT NOT NULL,
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	userId INT NOT NULL,
	photoId INT NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users (userId),
	FOREIGN KEY (photoId) REFERENCES Photos (photoId),
	CONSTRAINT ValidRate CHECK (rate>=1 AND rate<=5),
	CONSTRAINT OnlyOneRatePerUserToAPhoto UNIQUE (photoId, userId)
);

CREATE TABLE Comments (
	commentId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	comment VARCHAR(512) NOT NULL,
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	userId INT NOT NULL,
	photoId INT NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users (userId),
	FOREIGN KEY (photoId) REFERENCES Photos (photoId),
	CONSTRAINT CommentcannotbeNull CHECK (comment NOT IN (""))
);

CREATE TABLE FollowingFollowers (
	ffId INT NOT NULL,
	Siguiendo INT NOT NULL,
	Seguido INT NOT NULL,
	FOREIGN KEY (Siguiendo) REFERENCES Users (userId),
	FOREIGN KEY (Seguido) REFERENCES Users (userId)
);

CREATE TABLE Categories (
	category VARCHAR(64) NOT NULL PRIMARY KEY,
	CONSTRAINT DupedCategory UNIQUE(category),
	CONSTRAINT InvalidCategory CHECK (category NOT IN (""))
);

CREATE TABLE PhotoCategories (
	photocategoryId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	photoId INT NOT NULL,
	category VARCHAR(64) NOT NULL,
	FOREIGN KEY (photoId) REFERENCES Photos (photoId),
	FOREIGN KEY (category) REFERENCES Categories (category),
	CONSTRAINT DuplicateEntryforPhotoCategory UNIQUE(photoId, category)
);

CREATE TABLE InappropriateWords (
	inappropiateword VARCHAR(64) NOT NULL PRIMARY KEY,
	CONSTRAINT InvalidInappWord CHECK (inappropiateword NOT IN (""))
);