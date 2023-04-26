import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id"),
  nickname: text("nickname"),
  password: text("password"),
});
