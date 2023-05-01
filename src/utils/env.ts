import { config } from "dotenv";
import { z } from "zod";

const envParser = z.object({
  PORT: z.number().default(3000),
  NODE_ENV: z.string().default("development"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  REDIS_PASSWORD: z.string().default(""),
  REDIS_PORT: z.number().default(6379),
  REDIS_HOST: z.string().default("localhost"),
  REDIS_DB: z.number().default(0),
});

export const env = envParser.parse(config().parsed);
