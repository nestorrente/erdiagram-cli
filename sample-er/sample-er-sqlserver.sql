CREATE SEQUENCE "User_UserNum_seq" START WITH 1;
CREATE TABLE "User" (
    "Id" bigint NOT NULL IDENTITY(1, 1),
    "Username" nvarchar(50) NOT NULL,
    "Name" nvarchar(50) NOT NULL,
    "Birthday" date,
    "UserNum" smallint NOT NULL DEFAULT NEXT VALUE FOR User_UserNum_seq,
    "Active" bit NOT NULL,
    "CountryId" bigint NOT NULL,
    "AlternativeCountryId" bigint,
    CONSTRAINT "User_pk" PRIMARY KEY ("Id"),
    CONSTRAINT "User_Username_unique" UNIQUE ("Username")
);

CREATE TABLE "Country" (
    "Id" bigint NOT NULL IDENTITY(1, 1),
    "Code" nvarchar(5) NOT NULL,
    "Name" nvarchar(100) NOT NULL,
    CONSTRAINT "Country_pk" PRIMARY KEY ("Id")
);

CREATE TABLE "Permission" (
    "Id" bigint NOT NULL IDENTITY(1, 1),
    "Code" nvarchar(30) NOT NULL,
    "Description" nvarchar(200) NOT NULL,
    CONSTRAINT "Permission_pk" PRIMARY KEY ("Id")
);

CREATE TABLE "Tree" (
    "Id" bigint NOT NULL IDENTITY(1, 1),
    "HeadNodeId" bigint NOT NULL,
    CONSTRAINT "Tree_pk" PRIMARY KEY ("Id")
);

CREATE TABLE "TreeNode" (
    "Id" bigint NOT NULL IDENTITY(1, 1),
    "Value" int NOT NULL,
    "ParentId" bigint,
    CONSTRAINT "TreeNode_pk" PRIMARY KEY ("Id")
);

CREATE TABLE "UserPermission" (
    "Id" bigint NOT NULL IDENTITY(1, 1),
    "UserId" bigint NOT NULL,
    "PermissionId" bigint NOT NULL,
    CONSTRAINT "UserPermission_pk" PRIMARY KEY ("Id")
);

CREATE TABLE "Follows" (
    "Id" bigint NOT NULL IDENTITY(1, 1),
    "FollowerId" bigint NOT NULL,
    "FollowId" bigint NOT NULL,
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
