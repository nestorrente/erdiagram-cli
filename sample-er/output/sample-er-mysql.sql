CREATE TABLE `User` (
    `userId` BIGINT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `birthday` DATE,
    `avatar` BLOB,
    `active` BOOLEAN NOT NULL,
    `countryId` BIGINT NOT NULL,
    `alternativeCountryId` BIGINT,
    CONSTRAINT `User_pk` PRIMARY KEY (`userId`),
    CONSTRAINT `User_username_unique` UNIQUE (`username`)
);

CREATE TABLE `Country` (
    `theCountryId` BIGINT NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(5) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    CONSTRAINT `Country_pk` PRIMARY KEY (`theCountryId`)
);

CREATE TABLE `Permission` (
    `permissionId` BIGINT NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(30) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    CONSTRAINT `Permission_pk` PRIMARY KEY (`permissionId`)
);

CREATE TABLE `Tree` (
    `treeId` BIGINT NOT NULL AUTO_INCREMENT,
    `headNodeId` BIGINT NOT NULL,
    CONSTRAINT `Tree_pk` PRIMARY KEY (`treeId`),
    CONSTRAINT `Tree_headNodeId_unique` UNIQUE (`headNodeId`)
);

CREATE TABLE `TreeNode` (
    `treeNodeId` BIGINT NOT NULL AUTO_INCREMENT,
    `value` INT NOT NULL,
    `parentId` BIGINT,
    CONSTRAINT `TreeNode_pk` PRIMARY KEY (`treeNodeId`)
);

CREATE TABLE `UserPermission` (
    `userPermissionId` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `permissionId` BIGINT NOT NULL,
    CONSTRAINT `UserPermission_pk` PRIMARY KEY (`userPermissionId`)
);

CREATE TABLE `Follows` (
    `followsId` BIGINT NOT NULL AUTO_INCREMENT,
    `followerId` BIGINT NOT NULL,
    `followId` BIGINT NOT NULL,
    CONSTRAINT `Follows_pk` PRIMARY KEY (`followsId`)
);

ALTER TABLE `User` ADD CONSTRAINT `User_countryId_fk` FOREIGN KEY (`countryId`) REFERENCES `Country` (`theCountryId`);
ALTER TABLE `User` ADD CONSTRAINT `User_alternativeCountryId_fk` FOREIGN KEY (`alternativeCountryId`) REFERENCES `Country` (`theCountryId`);

ALTER TABLE `Tree` ADD CONSTRAINT `Tree_headNodeId_fk` FOREIGN KEY (`headNodeId`) REFERENCES `TreeNode` (`treeNodeId`);

ALTER TABLE `TreeNode` ADD CONSTRAINT `TreeNode_parentId_fk` FOREIGN KEY (`parentId`) REFERENCES `TreeNode` (`treeNodeId`);

ALTER TABLE `UserPermission` ADD CONSTRAINT `UserPermission_userId_fk` FOREIGN KEY (`userId`) REFERENCES `User` (`userId`);
ALTER TABLE `UserPermission` ADD CONSTRAINT `UserPermission_permissionId_fk` FOREIGN KEY (`permissionId`) REFERENCES `Permission` (`permissionId`);

ALTER TABLE `Follows` ADD CONSTRAINT `Follows_followerId_fk` FOREIGN KEY (`followerId`) REFERENCES `User` (`userId`);
ALTER TABLE `Follows` ADD CONSTRAINT `Follows_followId_fk` FOREIGN KEY (`followId`) REFERENCES `User` (`userId`);
