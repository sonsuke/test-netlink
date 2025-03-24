import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { bootstrapRedis } from "./bootstrap-redis";
import { bootstrapDB } from "./bootstrap-database";
import userController from "./controllers/user.controller";
import cors from "cors"
const bootstrap = async () => {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000", // Chỉ cho phép domain này
      methods: "GET,POST,PUT,DELETE", // Chỉ cho phép các method này
      allowedHeaders: "Content-Type,Authorization", // Header được phép
      credentials: true, // Cho phép cookie từ client
    })
  );

  //start data source
  await bootstrapDB();

  //start redis
  await bootstrapRedis();
  const PORT = process.env.PORT;
  const globalPrefix = "/api/v1";
  app.use(globalPrefix, app._router);
  app.use("/users", userController);

  app.listen(PORT, () => console.log(`> Server listening on ${PORT}`));
};

bootstrap();
