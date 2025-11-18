import { VehicleController } from "../Controllers/VehicleController.js";
import { VehicleModel } from "../Models/VehicleModel.js";
import { Router } from "express";

export const createVehicleRouter = ({ VehicleModel }) => {
    const vehicleRouter = Router();
    const vehicleController = new VehicleController({ VehicleModel });

    vehicleRouter.post('/',
        /*
            #swagger.tags = ['Vehicles']
            #swagger.description = 'Crear un nuevo vehículo'
        */
        vehicleController.createVehicle
    );

    vehicleRouter.get('/',
        /*
            #swagger.tags = ['Vehicles']
            #swagger.description = 'Obtener todos los vehículos'
        */
        vehicleController.getVehicles
    );

    vehicleRouter.get('/:id',
        /*
            #swagger.tags = ['Vehicles']
            #swagger.description = 'Obtener un vehículo por ID'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID del vehículo',
                required: true
            }
        */
        vehicleController.getVehicleById
    );

    vehicleRouter.put('/:id',
        /*
            #swagger.tags = ['Vehicles']
            #swagger.description = 'Actualizar un vehículo por ID'
        */
        vehicleController.updateVehicle
    );

    vehicleRouter.delete('/:id',
        /*
            #swagger.tags = ['Vehicles']
            #swagger.description = 'Eliminar un vehículo por ID'
        */
        vehicleController.deleteVehicle
    );

    return vehicleRouter;
};
