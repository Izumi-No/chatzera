import { pgTable, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  nickname: text("nickname").notNull(),
  password: text("password").notNull(),
});
