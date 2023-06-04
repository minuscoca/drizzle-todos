DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('TODO', 'COMPLETED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"completedAt" timestamp,
	"status" status
);
