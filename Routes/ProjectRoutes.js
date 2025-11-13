import { Router } from "express";
import { ProjectController } from "../Controllers/ProjectController.js";


const router = Router();

router.post('/', ProjectController.createProject);
router.get('/', ProjectController.getProjects);
router.get('/:name', ProjectController.getProjectByName);
router.put('/:id', ProjectController.updateProject);
router.delete('/:id', ProjectController.deleteProject);

export default router;
