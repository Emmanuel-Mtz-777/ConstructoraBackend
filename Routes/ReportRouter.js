import { Router } from "express";
import { ReportsController } from "../Controllers/ReportsController.js";

export const createReportsRouter = ({ AccessModel }) => {
    const reportsRouter = Router();
    const reportsController = new ReportsController({ AccessModel });

    reportsRouter.get('/accesos',reportsController.getReportsAccesos);

    return reportsRouter;
};
