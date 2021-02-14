CREATE SEQUENCE "User_UserNum_seq" START WITH 1;
CREATE TABLE "User" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "Username" NVARCHAR(50) NOT NULL,
    "Name" NVARCHAR(50) NOT NULL,
    "Birthday" DATE,
    "UserNum" SMALLINT NOT NULL DEFAULT NEXT VALUE FOR "User_UserNum_seq",
    "Active" BIT NOT NULL,
    "CountryId" BIGINT NOT NULL,
    "AlternativeCountryId" BIGINT,
    CONSTRAINT "User_pk" PRIMARY KEY ("Id"),
    CONSTRAINT "User_Username_unique" UNIQUE ("Username")
);

CREATE TABLE "Country" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "Code" NVARCHAR(5) NOT NULL,
    "Name" NVARCHAR(100) NOT NULL,
    CONSTRAINT "Country_pk" PRIMARY KEY ("Id")
);

CREATE TABLE "Permission" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "Code" NVARCHAR(30) NOT NULL,
    "Description" NVARCHAR(200) NOT NULL,
    CONSTRAINT "Permission_pk" PRIMARY KEY ("Id")
);

CREATE TABLE "Tree" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "HeadNodeId" BIGINT NOT NULL,
    CONSTRAINT "Tree_pk" PRIMARY KEY ("Id")
);

CREATE TABLE "TreeNode" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "Value" INT NOT NULL,
    "ParentId" BIGINT,
    CONSTRAINT "TreeNode_pk" PRIMARY KEY ("Id")
);

CREATE TABLE "UserPermission" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "UserId" BIGINT NOT NULL,
    "PermissionId" BIGINT NOT NULL,
    CONSTRAINT "UserPermission_pk" PRIMARY KEY ("Id")
);

CREATE TABLE "Follows" (
    "Id" BIGINT NOT NULL IDENTITY(1, 1),
    "FollowerId" BIGINT NOT NULL,
    "FollowId" BIGINT NOT NULL,
    CONSTRAINT "Follows_pk" PRIMARY KEY ("Id")
);

ALTER TABLE "User" ADD CONSTRAINT "User_CountryId_fk" FOREIGN KEY ("CountryId") REFERENCES "Country" ("Id");
ALTER TABLE "User" ADD CONSTRAINT "User_AlternativeCountryId_fk" FOREIGN KEY ("AlternativeCountryId") REFERENCES "Country" ("Id");

ALTER TABLE "Tree" ADD CONSTRAINT "Tree_HeadNodeId_fk" FOREIGN KEY ("HeadNodeId") REFERENCES "TreeNode" ("Id");

ALTER TABLE "TreeNode" ADD CONSTRAINT "TreeNode_ParentId_fk" FOREIGN KEY ("ParentId") REFERENCES "TreeNode" ("Id");

ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "User" ("Id");
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_PermissionId_fk" FOREIGN KEY ("PermissionId") REFERENCES "Permission" ("Id");

ALTER TABLE "Follows" ADD CONSTRAINT "Follows_FollowerId_fk" FOREIGN KEY ("FollowerId") REFERENCES "User" ("Id");
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_FollowId_fk" FOREIGN KEY ("FollowId") REFERENCES "User" ("Id");
