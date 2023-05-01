import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import "dotenv/config";
import path from "path";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool);

// this will automatically run needed migrations on the database
(async () => {
  await migrate(db, {
    migrationsFolder: path.resolve(__dirname, "./migrations"),
  });
})();
