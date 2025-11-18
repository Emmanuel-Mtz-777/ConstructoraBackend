import { Router } from "express";
import { ProjectController } from "../Controllers/ProjectController.js";

export const createProjectRouter = ({ ProjectModel }) => {
    const projectRouter = Router();
    const projectController = new ProjectController({ ProjectModel });

    projectRouter.post('/',projectController.createProject);
    projectRouter.get('/',projectController.getProjects);
    projectRouter.get('/:name',projectController.getProjectByName);
    projectRouter.put('/:id',projectController.updateProject);
    projectRouter.delete('/:id',projectController.deleteProject);

    return projectRouter;
};
