import express from "express";
import userRoutes from "./Routes/UserRoutes.js";
import projectRoutes from "./Routes/ProjectRoutes.js";
import vehicleRoutes from "./Routes/VehicleRoutes.js";
import AccessRouter  from "./Routes/AccessRouter.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { verifyToken } from "./Middlewares/Token.js";
import { authorizeRoles } from "./Middlewares/Rols.js";

dotenv.config();
const Port= process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Projects endpoint works');
});
app.use('/users', userRoutes);
app.use(verifyToken);
app.use('/vehicles', vehicleRoutes);
app.use(authorizeRoles('admin', 'analista'));
app.use('/projects', projectRoutes);
app.use('/access', AccessRouter);

app.listen(Port, () => {
    console.log(`Server is running on  http://localhost:${Port}`);
});
