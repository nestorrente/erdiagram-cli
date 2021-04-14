CREATE TABLE "user" (
    "user_id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "username" VARCHAR(50) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "birthday" DATE,
    "avatar" BYTEA,
    "active" BOOLEAN NOT NULL,
    "country_id" BIGINT NOT NULL,
    "alternative_country_id" BIGINT,
    CONSTRAINT "user_pk" PRIMARY KEY ("user_id"),
    CONSTRAINT "user_username_unique" UNIQUE ("username")
);

CREATE TABLE "country" (
    "the_country_id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "code" VARCHAR(5) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    CONSTRAINT "country_pk" PRIMARY KEY ("the_country_id")
);

CREATE TABLE "permission" (
    "permission_id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "code" VARCHAR(30) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    CONSTRAINT "permission_pk" PRIMARY KEY ("permission_id")
);

CREATE TABLE "tree" (
    "tree_id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "head_node_id" BIGINT NOT NULL,
    CONSTRAINT "tree_pk" PRIMARY KEY ("tree_id"),
    CONSTRAINT "tree_head_node_id_unique" UNIQUE ("head_node_id")
);

CREATE TABLE "tree_node" (
    "tree_node_id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "value" INTEGER NOT NULL,
    "parent_id" BIGINT,
    CONSTRAINT "tree_node_pk" PRIMARY KEY ("tree_node_id")
);

CREATE TABLE "user_permission" (
    "user_permission_id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "user_id" BIGINT NOT NULL,
    "permission_id" BIGINT NOT NULL,
    CONSTRAINT "user_permission_pk" PRIMARY KEY ("user_permission_id")
);

CREATE TABLE "follows" (
    "follows_id" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY,
    "follower_id" BIGINT NOT NULL,
    "follow_id" BIGINT NOT NULL,
    CONSTRAINT "follows_pk" PRIMARY KEY ("follows_id")
);

ALTER TABLE "user" ADD CONSTRAINT "user_country_id_fk" FOREIGN KEY ("country_id") REFERENCES "country" ("the_country_id");
ALTER TABLE "user" ADD CONSTRAINT "user_alternative_country_id_fk" FOREIGN KEY ("alternative_country_id") REFERENCES "country" ("the_country_id");

ALTER TABLE "tree" ADD CONSTRAINT "tree_head_node_id_fk" FOREIGN KEY ("head_node_id") REFERENCES "tree_node" ("tree_node_id");

ALTER TABLE "tree_node" ADD CONSTRAINT "tree_node_parent_id_fk" FOREIGN KEY ("parent_id") REFERENCES "tree_node" ("tree_node_id");

ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_permission_id_fk" FOREIGN KEY ("permission_id") REFERENCES "permission" ("permission_id");

ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_fk" FOREIGN KEY ("follower_id") REFERENCES "user" ("user_id");
ALTER TABLE "follows" ADD CONSTRAINT "follows_follow_id_fk" FOREIGN KEY ("follow_id") REFERENCES "user" ("user_id");
