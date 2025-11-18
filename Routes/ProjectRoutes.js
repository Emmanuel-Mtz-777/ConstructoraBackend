import { Router } from "express";
import { ProjectController } from "../Controllers/ProjectController.js";

export const createProjectRouter = ({ ProjectModel }) => {
    const projectRouter = Router();
    const projectController = new ProjectController({ ProjectModel });

    projectRouter.post('/',
        /*
            #swagger.tags = ['Projects']
            #swagger.description = 'Crear un nuevo proyecto'
        */
        projectController.createProject
    );

    projectRouter.get('/',
        /*
            #swagger.tags = ['Projects']
            #swagger.description = 'Obtener todos los proyectos'
        */
        projectController.getProjects
    );

    projectRouter.get('/:name',
        /*
            #swagger.tags = ['Projects']
            #swagger.description = 'Obtener un proyecto por nombre'
            #swagger.parameters['name'] = {
                in: 'path',
                description: 'Nombre del proyecto',
                required: true
            }
        */
        projectController.getProjectByName
    );

    projectRouter.put('/:id',
        /*
            #swagger.tags = ['Projects']
            #swagger.description = 'Actualizar un proyecto por ID'
            #swagger.parameters['id'] = {
                in: 'path',
                description: 'ID del proyecto',
                required: true
            }
        */
        projectController.updateProject
    );

    projectRouter.delete('/:id',
        /*
            #swagger.tags = ['Projects']
            #swagger.description = 'Eliminar un proyecto por ID'
        */
        projectController.deleteProject
    );

    return projectRouter;
};
