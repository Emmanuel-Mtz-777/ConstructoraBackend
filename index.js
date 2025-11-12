import express from "express";
import userRoutes from "./Routes/UserRoutes.js";
import productRoutes from "./Routes/ProjectRoutes.js";
import vehicleRoutes from "./Routes/VehicleRoutes.js";
import AccessRouter  from "./Routes/AccessRouter.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/projects', productRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/access', AccessRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on  http://localhost:${process.env.PORT}`);
});
