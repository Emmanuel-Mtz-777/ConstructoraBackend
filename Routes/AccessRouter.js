import { AccessController } from "../Controllers/AccessController.js";
import { Router } from "express";

const router = Router();

router.post('/', AccessController.createAccess);
router.get('/', AccessController.getAccesses);
router.get('/user/:userId', AccessController.getAccessesByUser);
router.get('/resource/:resource/:resourceId', AccessController.getAccessesByResource);

export default router;