import { VehicleController } from "../Controllers/VehicleController.js";
import { VehicleModel } from "../Models/VehicleModel.js";
import { Router } from "express";


export const createVehicleRouter = ({VehicleModel}) => {
    const vehicleRouter = Router();
    const vehicleController = new VehicleController({VehicleModel});

    vehicleRouter.post('/', vehicleController.createVehicle);
    vehicleRouter.get('/', vehicleController.getVehicles);
    vehicleRouter.get('/:id', vehicleController.getVehicleById);
    vehicleRouter.put('/:id', vehicleController.updateVehicle);
    vehicleRouter.delete('/:id', vehicleController.deleteVehicle);

    return vehicleRouter;
}