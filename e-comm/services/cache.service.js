import dotenv from "dotenv";
dotenv.config();
import Redis from "ioredis";

export const cacheInstance = new Redis({
  host: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});
