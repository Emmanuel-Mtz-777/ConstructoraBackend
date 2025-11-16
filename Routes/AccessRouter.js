import { AccessController } from "../Controllers/AccessController.js";
import { Router } from "express";

export const createAccessRouter = ({AccessModel}) => {

    const accessRouter = Router();
    const accessController = new AccessController({AccessModel});

    accessRouter.post('/', accessController.createAccess);
    accessRouter.get('/', accessController.getAccesses);
    accessRouter.get('/user/:userId', accessController.getAccessesByUser);
    accessRouter.get('/resource/:resource/:resourceId', accessController.getAccessesByResource);

    return accessRouter;
}