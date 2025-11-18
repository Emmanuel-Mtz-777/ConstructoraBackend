import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

import { AccessModel } from "./Models/AccessModel.js";
import { ProjectModel } from "./Models/ProjectModel.js";
import { UserModel } from "./Models/UserModel.js";
import { VehicleModel } from "./Models/VehicleModel.js";
import { createUserRouter } from "./Routes/UserRoutes.js";
import { createProjectRouter } from "./Routes/ProjectRoutes.js";
import { createVehicleRouter } from "./Routes/VehicleRoutes.js";
import { createAccessRouter } from "./Routes/AccessRouter.js";
import { createReportsRouter } from "./Routes/ReportRouter.js";
import { verifyToken } from "./Middlewares/Token.js";
import { authorizeRoles } from "./Middlewares/Rols.js";
import { generalRateLimit } from "./Middlewares/RateLimit.js";

dotenv.config();
const Port = process.env.PORT ?? 3000;
const swaggerFile = JSON.parse(fs.readFileSync("./swagger-output.json", "utf8"));
const app = express();

app.use(express.json());
app.use(cookieParser());


app.get('/', (req,res) => res.send('Welcome to the API'));


app.use('/users', createUserRouter({ UserModel }));
app.use(generalRateLimit);
app.use(verifyToken);

app.use('/vehicles', createVehicleRouter({ VehicleModel }));

app.use(authorizeRoles('admin', 'analista'));

app.use('/projects', createProjectRouter({ ProjectModel }));
app.use('/access', createAccessRouter({ AccessModel }));
app.use('/reports', createReportsRouter({ AccessModel }));


app.listen(Port, () => {
  console.log(`Server running at http://localhost:${Port}`);
});
