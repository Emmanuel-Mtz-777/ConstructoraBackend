import { AccessController } from "../Controllers/AccessController.js";
import { Router } from "express";

export const createAccessRouter = ({ AccessModel }) => {
    const accessRouter = Router();
    const accessController = new AccessController({ AccessModel });

    accessRouter.post('/',
        /*
            #swagger.tags = ['Access']
            #swagger.description = 'Crear un registro de acceso'
        */
        accessController.createAccess
    );

    accessRouter.get('/',
        /*
            #swagger.tags = ['Access']
            #swagger.description = 'Obtener todos los accesos'
        */
        accessController.getAccesses
    );

    accessRouter.get('/user/:userId',
        /*
            #swagger.tags = ['Access']
            #swagger.description = 'Obtener accesos por ID de usuario'
            #swagger.parameters['userId'] = {
                in: 'path',
                description: 'ID del usuario',
                required: true
            }
        */
        accessController.getAccessesByUser
    );

    accessRouter.get('/resource/:resource/:resourceId',
        /*
            #swagger.tags = ['Access']
            #swagger.description = 'Obtener accesos por recurso y su ID'
            #swagger.parameters['resource'] = {
                in: 'path',
                description: 'Nombre del recurso',
                required: true
            }
            #swagger.parameters['resourceId'] = {
                in: 'path',
                description: 'ID del recurso',
                required: true
            }
        */
        accessController.getAccessesByResource
    );

    return accessRouter;
};
