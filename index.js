import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { AccessModel } from "./Models/AccessModel.js";
import { ProjectModel } from "./Models/ProjectModel.js";
import { UserModel } from "./Models/UserModel.js";
import { VehicleModel } from "./Models/VehicleModel.js";
import { createUserRouter } from "./Routes/UserRoutes.js";
import { createProjectRouter } from "./Routes/ProjectRoutes.js";
import { createVehicleRouter } from "./Routes/VehicleRoutes.js";
import {createAccessRouter}  from "./Routes/AccessRouter.js";
import { verifyToken } from "./Middlewares/Token.js";
import { authorizeRoles } from "./Middlewares/Rols.js";

dotenv.config();
const Port= process.env.PORT ?? 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Projects endpoint works');
});
app.use('/users', createUserRouter({UserModel}));
app.use(verifyToken);
app.use('/vehicles', createVehicleRouter({VehicleModel}));
app.use(authorizeRoles('admin', 'analista'));
app.use('/projects', createProjectRouter({ProjectModel}));
app.use('/access', createAccessRouter({AccessModel}));

app.listen(Port, () => {
    console.log(`Server is running on  http://localhost:${Port}`);
});
