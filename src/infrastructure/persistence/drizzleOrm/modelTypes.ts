import { InferModel } from "drizzle-orm";
import { users } from "./schema/users";

export type DrizzleUser = InferModel<typeof users, "insert">;
