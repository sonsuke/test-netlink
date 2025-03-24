import { NextFunction, Request, Response } from "express";
import { redisClient } from "../bootstrap-redis";

export const cacheMiddleWare =
  (expireTime: number = 300) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const key = `$${req.originalUrl}`;

    try {
      if (redisClient.isOpen) {
        const cachedData = await redisClient.get(key);
        if (cachedData) {
          console.log(" Cache hit!");
          res.json(JSON.parse(cachedData));
          return;
        }

        console.log(" Cache miss, fetching data...");

        const originalJson = res.json.bind(res);
        res.json = (data): Response => {
          redisClient.setEx(key, expireTime, JSON.stringify(data));
          return originalJson(data);
        };
      }

      next();
    } catch (error) {
      console.error("Cache middleware error:", error);
      next(error);
    }
  };
