ALTER TABLE "users" ALTER COLUMN "id" SET NOT NULL;
ALTER TABLE "users" ADD PRIMARY KEY ("id");
ALTER TABLE "users" ALTER COLUMN "nickname" SET NOT NULL;
ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL;