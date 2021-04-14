CREATE TABLE "User" (
    "UserId" BIGINT NOT NULL IDENTITY(1, 1),
    "Username" NVARCHAR(50) NOT NULL,
    "Name" NVARCHAR(50) NOT NULL,
    "Birthday" DATE,
    "Avatar" VARBINARY(MAX),
    "Active" BIT NOT NULL,
    "CountryId" BIGINT NOT NULL,
    "AlternativeCountryId" BIGINT,
    CONSTRAINT "User_pk" PRIMARY KEY ("UserId"),
    CONSTRAINT "User_Username_unique" UNIQUE ("Username")
);

CREATE TABLE "Country" (
    "TheCountryId" BIGINT NOT NULL IDENTITY(1, 1),
    "Code" NVARCHAR(5) NOT NULL,
    "Name" NVARCHAR(100) NOT NULL,
    CONSTRAINT "Country_pk" PRIMARY KEY ("TheCountryId")
);

CREATE TABLE "Permission" (
    "PermissionId" BIGINT NOT NULL IDENTITY(1, 1),
    "Code" NVARCHAR(30) NOT NULL,
    "Description" NVARCHAR(200) NOT NULL,
    CONSTRAINT "Permission_pk" PRIMARY KEY ("PermissionId")
);

CREATE TABLE "Tree" (
    "TreeId" BIGINT NOT NULL IDENTITY(1, 1),
    "HeadNodeId" BIGINT NOT NULL,
    CONSTRAINT "Tree_pk" PRIMARY KEY ("TreeId"),
    CONSTRAINT "Tree_HeadNodeId_unique" UNIQUE ("HeadNodeId")
);

CREATE TABLE "TreeNode" (
    "TreeNodeId" BIGINT NOT NULL IDENTITY(1, 1),
    "Value" INT NOT NULL,
    "ParentId" BIGINT,
    CONSTRAINT "TreeNode_pk" PRIMARY KEY ("TreeNodeId")
);

CREATE TABLE "UserPermission" (
    "UserPermissionId" BIGINT NOT NULL IDENTITY(1, 1),
    "UserId" BIGINT NOT NULL,
    "PermissionId" BIGINT NOT NULL,
    CONSTRAINT "UserPermission_pk" PRIMARY KEY ("UserPermissionId")
);

CREATE TABLE "Follows" (
    "FollowsId" BIGINT NOT NULL IDENTITY(1, 1),
    "FollowerId" BIGINT NOT NULL,
    "FollowId" BIGINT NOT NULL,
    CONSTRAINT "Follows_pk" PRIMARY KEY ("FollowsId")
);

ALTER TABLE "User" ADD CONSTRAINT "User_CountryId_fk" FOREIGN KEY ("CountryId") REFERENCES "Country" ("TheCountryId");
ALTER TABLE "User" ADD CONSTRAINT "User_AlternativeCountryId_fk" FOREIGN KEY ("AlternativeCountryId") REFERENCES "Country" ("TheCountryId");

ALTER TABLE "Tree" ADD CONSTRAINT "Tree_HeadNodeId_fk" FOREIGN KEY ("HeadNodeId") REFERENCES "TreeNode" ("TreeNodeId");

ALTER TABLE "TreeNode" ADD CONSTRAINT "TreeNode_ParentId_fk" FOREIGN KEY ("ParentId") REFERENCES "TreeNode" ("TreeNodeId");

ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "User" ("UserId");
ALTER TABLE "UserPermission" ADD CONSTRAINT "UserPermission_PermissionId_fk" FOREIGN KEY ("PermissionId") REFERENCES "Permission" ("PermissionId");

ALTER TABLE "Follows" ADD CONSTRAINT "Follows_FollowerId_fk" FOREIGN KEY ("FollowerId") REFERENCES "User" ("UserId");
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_FollowId_fk" FOREIGN KEY ("FollowId") REFERENCES "User" ("UserId");
