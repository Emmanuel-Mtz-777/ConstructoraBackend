export class ProjectController {
    constructor({ ProjectModel }) {
        this.projectModel = ProjectModel;
    }
    createProject=async (req, res) => {
        try {
            const projectData = req.body;
            const newProject = await this.projectModel.createProject(projectData);
            if (!newProject) throw new CustomError(400, 'Error creating project');
            res.status(201).json(newProject);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    getProjects=async (req, res) => {
        try {
            const projects = await this.projectModel.getProjects();
            res.status(200).json(projects);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    getProjectByName=async (req, res) => {
        try {
            const projectName = req.params.name;
            const project = await this.projectModel.getProjectByName(projectName);
            if (!project) throw new CustomError(404, 'Project not found');
            res.status(200).json(project);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    updateProject=async (req, res) => {
        try {
            const projectId = req.params.id;
            const projectData = req.body;
            const updatedProject = await this.projectModel.updateProject(projectId, projectData);
            if (!updatedProject) throw new CustomError(400, 'Error updating project');
            res.status(200).json(updatedProject);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    deleteProject=async (req, res) => {
        try {
            const projectId = req.params.id;
            const deletedProject = await this.projectModel.deleteProject(projectId);
            if (!deletedProject) throw new CustomError(400, 'Error deleting project');
            res.status(200).json({ message: 'Project deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }   
}