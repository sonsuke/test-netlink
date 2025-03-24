import { Router } from "express";
import { UserService } from "../services/user.service";
import { cacheMiddleWare } from "../middlewares/cache.middleware";

const route = Router();

route.get("/", cacheMiddleWare(100), UserService.getListUser);

export default route;