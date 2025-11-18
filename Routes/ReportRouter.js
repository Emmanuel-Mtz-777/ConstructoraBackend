import { Router } from "express";
import { ReportsController } from "../Controllers/ReportsController.js";

export const createReportsRouter = ({ AccessModel }) => {
    const reportsRouter = Router();
    const reportsController = new ReportsController({ AccessModel });

    reportsRouter.get('/accesos',
        /*
            #swagger.tags = ['Reportes']
            #swagger.description = 'Genera reportes agregados de accesos'

            #swagger.parameters['startDate'] = {
                in: 'query',
                description: 'Fecha inicial (YYYY-MM-DD)',
                required: false,
                type: 'string'
            }

            #swagger.parameters['endDate'] = {
                in: 'query',
                description: 'Fecha final (YYYY-MM-DD)',
                required: false,
                type: 'string'
            }

            #swagger.parameters['resource'] = {
                in: 'query',
                description: 'Filtrar por recurso (proyecto, vehiculo)',
                required: false,
                type: 'string'
            }

            #swagger.parameters['page'] = {
                in: 'query',
                description: 'Número de página',
                required: false,
                type: 'integer'
            }

            #swagger.parameters['limit'] = {
                in: 'query',
                description: 'Límite por página',
                required: false,
                type: 'integer'
            }
        */
        reportsController.getReportsAccesos
    );

    return reportsRouter;
};
