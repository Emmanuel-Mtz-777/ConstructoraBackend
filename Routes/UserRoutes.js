import { Router } from "express";
import { UserController } from "../Controllers/UserController.js";
import { loginRateLimit } from "../Middlewares/RateLimit.js";

export const createUserRouter = ({ UserModel }) => {
    const userRouter = Router();

    const userController = new UserController({ UserModel });

    userRouter.post('/register',userController.createUser);
    userRouter.post('/login',loginRateLimit,userController.loginUser);

    return userRouter;
};
