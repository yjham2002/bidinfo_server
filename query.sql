
CREATE TABLE Bidinfo_bidlist
(
	id                   INTEGER NOT NULL AUTO_INCREMENT,
	hid                  TEXT NULL,
	view                 INTEGER NULL,
	mid                  INTEGER NULL,
	Type                 INTEGER NULL,
	Url                  TEXT NULL,
	Title                TEXT NULL,
	Refer                TEXT NULL,
	BidNo                TEXT NULL,
	Bstart               TEXT NULL,
	Bexpire              TEXT NULL,
	PDate                TEXT NULL,
	Dept                 TEXT NULL,
	Charge               TEXT NULL,
	Date                 TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ( `id` )
);

CREATE TABLE Bidinfo_comment
(
	id                   INTEGER NOT NULL AUTO_INCREMENT,
	Comment              TEXT NULL,
	Amount               TEXT NULL,
	Date                 TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
	mid                  INTEGER NOT NULL,
	bid                  INTEGER NOT NULL,
	PRIMARY KEY ( `id` )
);

CREATE TABLE Bidinfo_picker 
(
    id                   INTEGER NOT NULL AUTO_INCREMENT,
    name                 TEXT NOT NULL ,
    tags                 TEXT NOT NULL ,
    PRIMARY KEY ( `id` ) 
);

CREATE TABLE Bidinfo_company
(
	id                   INTEGER NOT NULL AUTO_INCREMENT,
	Name                 TEXT NULL,
	Rnum                 TEXT NULL,
	Rprt                 TEXT NULL,
	Charge               TEXT NULL,
	Addr                 TEXT NULL,
	Phone                TEXT NULL,
	Email                TEXT NULL,
	Divs                 TEXT NULL,
	Divl                 TEXT NULL,
	Expl                 TEXT NULL,
	symbol               INTEGER NULL,
	Date                 TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
	hid                  TEXT NULL,
	Pnum                 INTEGER NOT NULL,
	PRIMARY KEY ( `id` )
);

CREATE TABLE Bidinfo_crawler
(
	id                   INTEGER NOT NULL AUTO_INCREMENT,
	Url                  TEXT NULL,
	Name                 TEXT NULL,
	LastGet              INTEGER NULL,
	Status               INTEGER NULL,
	Date                 TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ( `id` )
);

CREATE TABLE Bidinfo_GCM
(
	id                   INTEGER NOT NULL AUTO_INCREMENT,
	Token                TEXT NULL,
	Status               INTEGER NULL,
	Date                 TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
	mid                  INTEGER NOT NULL,
	PRIMARY KEY ( `id` )
);

CREATE TABLE Bidinfo_like
(
	Date                 TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
	bid                  INTEGER NOT NULL,
	mid                  INTEGER NOT NULL,
	PRIMARY KEY ( `bid`, `mid` )
);

CREATE TABLE Bidinfo_manage
(
	id                   INTEGER NOT NULL AUTO_INCREMENT,
	Account              TEXT NULL,
	Bank                 TEXT NULL,
	Date                 TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ( `id` )
);

CREATE TABLE Bidinfo_notice
(
	id                   INTEGER NOT NULL AUTO_INCREMENT,
	Title                TEXT NULL,
	Content              TEXT NULL,
	Date                 TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY ( `id` )
);

CREATE TABLE Bidinfo_request
(
	id                   INTEGER NOT NULL AUTO_INCREMENT,
	Draw                 TEXT NULL,
	RDate                DATE NULL,
	Income               INTEGER NULL,
	Date                 TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
	mid                  INTEGER NOT NULL,
	PRIMARY KEY ( `id` )
);

CREATE TABLE Bidinfo_user
(
	id                   INTEGER NOT NULL AUTO_INCREMENT,
	Uid                  TEXT NULL,
	Pwd                  TEXT NULL,
	Name                 TEXT NULL,
	ExpDate              DATE NULL,
	Bdate                DATE NULL,
	Status               INTEGER NULL,
	Log                  INTEGER NULL,
	Now                  INTEGER NULL,
	Phone                TEXT NULL,
	symbol               INTEGER NULL,
	Date                 TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
	hid                  TEXT NULL,
	PRIMARY KEY ( `id` )
);

ALTER TABLE Bidinfo_GCM convert to charset utf8;
ALTER TABLE Bidinfo_bidlist convert to charset utf8;
ALTER TABLE Bidinfo_comment convert to charset utf8;
ALTER TABLE Bidinfo_company convert to charset utf8;
ALTER TABLE Bidinfo_crawler convert to charset utf8;
ALTER TABLE Bidinfo_like convert to charset utf8;
ALTER TABLE Bidinfo_manage convert to charset utf8;
ALTER TABLE Bidinfo_notice convert to charset utf8;
ALTER TABLE Bidinfo_picker convert to charset utf8;
ALTER TABLE Bidinfo_request convert to charset utf8;
ALTER TABLE Bidinfo_user convert to charset utf8;