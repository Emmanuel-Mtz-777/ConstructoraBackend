import { Router } from "express";
import { UserController } from "../Controllers/UserController.js";
import { loginRateLimit } from "../Middlewares/RateLimit.js";

export const createUserRouter = ({ UserModel }) => {
    const userRouter = Router();

    const userController = new UserController({ UserModel });

    userRouter.post('/register',
        /*
            #swagger.tags = ['Users']
            #swagger.description = 'Registrar un nuevo usuario'
        */
        userController.createUser
    );

    userRouter.post('/login',loginRateLimit,
        /*
            #swagger.tags = ['Users']
            #swagger.description = 'Iniciar sesión de usuario'
        */
        userController.loginUser
    );

    return userRouter;
};
