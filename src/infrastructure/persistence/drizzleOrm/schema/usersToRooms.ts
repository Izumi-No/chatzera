import { pgTable, text } from "drizzle-orm/pg-core";
import { users } from "./users";
import { rooms } from "./rooms";

export const usersToRooms = pgTable("users_to_rooms", {
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  roomId: text("room_id")
    .notNull()
    .references(() => rooms.id),
});
