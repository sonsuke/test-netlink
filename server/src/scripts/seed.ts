import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { User } from "../entities/User.entity";
import { faker } from "@faker-js/faker";
import { AppDataSource } from "../bootstrap-database";

async function seed() {
  try {
    await AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(User);

    await userRepository.clear();

    const fakeUsers: User[] = [];
    for (let i = 0; i < 1000; i++) {
      const user = new User();
      user.firstName = faker.person.firstName();
      user.lastName = faker.person.lastName();
      user.email = faker.internet.email();
      user.phoneNo = faker.phone.number();
      user.isActive = true;
      fakeUsers.push(user);
    }

    await userRepository.save(fakeUsers);
    console.log("Fake data seeded successfully!");
  } catch (error) {
    console.error("Lỗi khi seed dữ liệu:", error);
  } finally {
    process.exit();
  }
}

seed();
