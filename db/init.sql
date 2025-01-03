CREATE DATABASE IF NOT EXISTS `dbms-example`;
USE `dbms-example`;

CREATE TABLE IF NOT EXISTS `User` (
	Id VARCHAR(20) NOT NULL,
	Account VARCHAR(50) NOT NULL,
	Name TEXT NOT NULL,
	Password TEXT NOT NULL,
	JoinAt TIMESTAMP NOT NULL DEFAULT NOW(),
	PRIMARY KEY(Id)
);
CREATE TABLE IF NOT EXISTS `Item` (
	Id INT AUTO_INCREMENT NOT NULL,
	Name TEXT NOT NULL,
	Quantity INT UNSIGNED NOT NULL,
	PRIMARY KEY(Id)
);
CREATE TABLE IF NOT EXISTS `PurchaseHistory` (
	Id INT AUTO_INCREMENT NOT NULL,
	BuyerId VARCHAR(20) NOT NULL,
	ItemId INT NOT NULL,
	Status ENUM('DONE', 'DELIVERING', 'CANCELLED') DEFAULT 'DELIVERING',
	PurchaseAt TIMESTAMP NOT NULL DEFAULT NOW(),
	PRIMARY KEY(Id),
	FOREIGN KEY(BuyerId) REFERENCES `User`(Id),
	FOREIGN KEY(ItemId) REFERENCES Item(Id)
);
