import { env } from "@/utils/env";
import { createClient } from "redis";

const redisConnection = createClient({
  url: env.REDIS_URL,
  password: env.REDIS_PASSWORD,
});

redisConnection.on("connect", () => {
  console.log(
    `[Redis]: Connected to redis server at ${env.REDIS_HOST}:${env.REDIS_PORT}`
  );
});

export { redisConnection };
