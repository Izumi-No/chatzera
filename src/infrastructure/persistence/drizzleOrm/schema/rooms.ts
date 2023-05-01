import { date, pgTable, text } from "drizzle-orm/pg-core";

export const rooms = pgTable("rooms", {
  id: text("id").primaryKey(),
  name: text("name"),
  createdAt: date("created_at").notNull(),
});
