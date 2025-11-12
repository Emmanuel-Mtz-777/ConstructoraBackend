import express from "express";
import userRoutes from "./Routes/UserRoutes.js";
import productRoutes from "./Routes/ProjectRoutes.js";
import vehicleRoutes from "./Routes/VehicleRoutes.js";
import AccessRouter  from "./Routes/AccessRouter.js";
import dotenv from 'dotenv';

dotenv.config();
const Port= process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Projects endpoint works');
});
app.use('/users', userRoutes);
app.use('/projects', productRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/access', AccessRouter);

app.listen(Port, () => {
    console.log(`Server is running on  http://localhost:${Port}`);
});
