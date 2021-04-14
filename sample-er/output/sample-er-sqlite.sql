PRAGMA foreign_keys = OFF;

CREATE TABLE "user" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT(50) NOT NULL,
    "name" TEXT(50) NOT NULL,
    "birthday" INTEGER,
    "avatar" BLOB,
    "active" INTEGER NOT NULL,
    "country_id" INTEGER NOT NULL,
    "alternative_country_id" INTEGER,
    CONSTRAINT "user_username_unique" UNIQUE ("username"),
    CONSTRAINT "user_country_id_fk" FOREIGN KEY ("country_id") REFERENCES "country" ("the_country_id"),
    CONSTRAINT "user_alternative_country_id_fk" FOREIGN KEY ("alternative_country_id") REFERENCES "country" ("the_country_id")
);

CREATE TABLE "country" (
    "the_country_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT(5) NOT NULL,
    "name" TEXT(100) NOT NULL
);

CREATE TABLE "permission" (
    "permission_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT(30) NOT NULL,
    "description" TEXT(200) NOT NULL
);

CREATE TABLE "tree" (
    "tree_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "head_node_id" INTEGER NOT NULL,
    CONSTRAINT "tree_head_node_id_unique" UNIQUE ("head_node_id"),
    CONSTRAINT "tree_head_node_id_fk" FOREIGN KEY ("head_node_id") REFERENCES "tree_node" ("tree_node_id")
);

CREATE TABLE "tree_node" (
    "tree_node_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL,
    "parent_id" INTEGER,
    CONSTRAINT "tree_node_parent_id_fk" FOREIGN KEY ("parent_id") REFERENCES "tree_node" ("tree_node_id")
);

CREATE TABLE "user_permission" (
    "user_permission_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,
    CONSTRAINT "user_permission_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id"),
    CONSTRAINT "user_permission_permission_id_fk" FOREIGN KEY ("permission_id") REFERENCES "permission" ("permission_id")
);

CREATE TABLE "follows" (
    "follows_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "follower_id" INTEGER NOT NULL,
    "follow_id" INTEGER NOT NULL,
    CONSTRAINT "follows_follower_id_fk" FOREIGN KEY ("follower_id") REFERENCES "user" ("user_id"),
    CONSTRAINT "follows_follow_id_fk" FOREIGN KEY ("follow_id") REFERENCES "user" ("user_id")
);

PRAGMA foreign_keys = ON;
