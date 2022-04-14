set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
    "userId" serial NOT NULL,
    "username" TEXT NOT NULL UNIQUE,
    CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."messages" (
    "messageId" serial NOT NULL,
    "content" TEXT NOT NULL,
    "userId" integer NOT NULL,
    "roomId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    CONSTRAINT "messages_pk" PRIMARY KEY ("messageId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."rooms" (
    "roomId" serial NOT NULL,
    "userId" integer,
    "roomName" TEXT NOT NULL,
    "youtubeVideo" TEXT,
    CONSTRAINT "rooms_pk" PRIMARY KEY ("roomId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "messages" ADD CONSTRAINT "messages_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk1" FOREIGN KEY ("roomId") REFERENCES "rooms"("roomId");

ALTER TABLE "rooms" ADD CONSTRAINT "rooms_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
