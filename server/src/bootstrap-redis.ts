import { createClient } from "redis";

export const redisClient = createClient({ url: process.env.REDIS_URL });
export const bootstrapRedis = async () => {
  console.log("Connecting redis...");
  try {
    await redisClient.connect();
    console.log("> Connect redis success");
    return () => redisClient;
  } catch (error) {
    console.log("> Connect redis failed: ", error.message || error);
  }
};
