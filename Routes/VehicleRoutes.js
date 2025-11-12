import { VehicleController } from "../Controllers/VehicleController.js";
import { Router } from "express";

const router = Router();

router.post('/', VehicleController.createVehicle);
router.get('/', VehicleController.getVehicles);
router.get('/:id', VehicleController.getVehicleById);
router.put('/:id', VehicleController.updateVehicle);
router.delete('/:id', VehicleController.deleteVehicle);
export default router;