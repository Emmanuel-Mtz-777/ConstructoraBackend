import { ProjectModel } from "../Models/ProjectsModel.js";

export class ProjectController {
    static async createProject(req, res) {
        try {
            const projectData = req.body;
            const newProject = await ProjectModel.createProject(projectData);
            if (!newProject) throw new CustomError(400, 'Error creating project');
            res.status(201).json(newProject);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async getProjects(req, res) {
        try {
            const projects = await ProjectModel.getProjects();
            res.status(200).json(projects);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async getProjectByName(req, res) {
        try {
            const projectName = req.params.name;
            const project = await ProjectModel.getProjectByName(projectName);
            if (!project) throw new CustomError(404, 'Project not found');
            res.status(200).json(project);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async updateProject(req, res) {
        try {
            const projectId = req.params.id;
            const projectData = req.body;
            const updatedProject = await ProjectModel.updateProject(projectId, projectData);
            if (!updatedProject) throw new CustomError(400, 'Error updating project');
            res.status(200).json(updatedProject);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async deleteProject(req, res) {
        try {
            const projectId = req.params.id;
            const deletedProject = await ProjectModel.deleteProject(projectId);
            if (!deletedProject) throw new CustomError(400, 'Error deleting project');
            res.status(200).json({ message: 'Project deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }   
}