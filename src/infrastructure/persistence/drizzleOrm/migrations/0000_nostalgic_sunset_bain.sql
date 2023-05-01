CREATE TABLE IF NOT EXISTS "rooms" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"created_at" date NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"nickname" text NOT NULL,
	"password" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "users_to_rooms" (
	"user_id" text NOT NULL,
	"room_id" text NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "users_to_rooms" ADD CONSTRAINT "users_to_rooms_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_to_rooms" ADD CONSTRAINT "users_to_rooms_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
