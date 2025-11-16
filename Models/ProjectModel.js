import MongoDB from '../Database/Mongo.js';
import { Schema } from 'mongoose';

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    state: { type: String, required: true },
    startDate: { type: Date, required: true },
    client: { type: String, required: true }
}, { timestamps: true });


export const Project = MongoDB.model('Project', ProjectSchema);

export class ProjectModel {
    static async createProject(projectData) {
        return await Project.create(projectData);
    }

    static async getProjectByName(projectName) {
        return await Project.findOne({ name: projectName });
    }
    static async getProjects() {
        return await Project.find();
    }

    static async updateProject(projectId, projectData) {
        return await Project.findByIdAndUpdate(projectId, projectData, { new: true });
    }

    static async deleteProject(projectId) {
        return await Project.findByIdAndDelete(projectId);
    }
}