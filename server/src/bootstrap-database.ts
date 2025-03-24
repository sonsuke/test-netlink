import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [__dirname + "/entities/*.entity.{ts,js}"],
  //   migrations: [],
  //   subscribers: [],
});

export const bootstrapDB = async () => {
  try {
    console.log("> Connecting DB...");
    await AppDataSource.initialize();
    console.log("> DB connected.");
  } catch (error) {
    console.log("> DB failed:", error.message || error);
  }
};
