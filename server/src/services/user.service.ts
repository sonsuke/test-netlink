import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../bootstrap-database";
import { User } from "../entities/User.entity";
import { FindOptionsWhere, Like } from "typeorm";

const userRepository = AppDataSource.getRepository(User);
export const UserService = {
  getListUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payloadFromRequest = req.query;
      const page = +payloadFromRequest.page || 1;
      const limit = +payloadFromRequest.limit || 20;

      let filterPayload: FindOptionsWhere<User> | FindOptionsWhere<User>[] = [];

      if (payloadFromRequest?.search) {
        filterPayload = [
          ...filterPayload,
          { firstName: Like(`%${payloadFromRequest.search}%`) },
          { lastName: Like(`%${payloadFromRequest.search}%`) },
          { email: Like(`%${payloadFromRequest.search}%`) },
        ];
      }

      const skip = (page - 1) * limit;

      const [users, count] = await userRepository.findAndCount({
        where: filterPayload,
        skip,
        take: limit,
      });
      res.json({
        data: users,
        count,
        page,
        limit,
      });
    } catch (error) {
      next(error);
    }
  },
};
