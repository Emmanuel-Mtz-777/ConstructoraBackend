import { DB_USER,DB_PASSWORD } from '../config.js';
import mongoose from 'mongoose';
import { UserModel } from '../Models/UserModel.js';
import { ProjectModel } from '../Models/ProjectsModel.js';
import { VehicleModel } from '../Models/VehicleModel.js';
import { AccessModel } from '../Models/AccessModel.js';

const uri =`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.oyy1w7r.mongodb.net/?appName=Cluster0`;

async function runMigration() {
    try {
        await mongoose.connect(uri);
        const users = [
        { name: 'Administrador', email: 'admin@example.com', password: 'admin123', rol: 'admin' },
        { name: 'Analista 1', email: 'analista1@example.com', password: 'analista123', rol: 'analista' },
        { name: 'Visitante 1', email: 'visitante1@example.com', password: 'visitante123', rol: 'visitante' }
        ];

        const createdUsers = [];
        for (const user of users) {
        const exists = await mongoose.model('User').findOne({ email: user.email });
        if (!exists) {
            const newUser = await UserModel.createUser(user);
            createdUsers.push(newUser);
            console.log(`Usuario creado: ${user.email}`);
        } else {
            console.log(`Usuario ya existe: ${user.email}`);
            createdUsers.push(exists);
        }
        }

        const projects = [
        { name: 'Proyecto Solar', location: 'Aguascalientes', state: 'Activo', startDate: new Date(), client: 'Solmex' },
        { name: 'Proyecto Eólico', location: 'Zacatecas', state: 'Planeado', startDate: new Date(), client: 'Viento SA' },
        { name: 'Proyecto Hidráulico', location: 'Jalisco', state: 'En ejecución', startDate: new Date(), client: 'AquaCorp' }
        ];

        const createdProjects = [];
        for (const project of projects) {
        const exists = await mongoose.model('Project').findOne({ name: project.name });
        if (!exists) {
            const newProject = await ProjectModel.createProject(project);
            createdProjects.push(newProject);
            console.log(`Proyecto creado: ${project.name}`);
        } else {
            console.log(`Proyecto ya existe: ${project.name}`);
            createdProjects.push(exists);
        }
        }
        const vehicles = [
        { placa: 'ABC-123', tipo: 'Camión', estado: 'Operativo', asignadoAProyecto: createdProjects[0]._id },
        { placa: 'XYZ-789', tipo: 'Pickup', estado: 'Mantenimiento', asignadoAProyecto: createdProjects[1]._id },
        { placa: 'JKL-456', tipo: 'Sedán', estado: 'Disponible', asignadoAProyecto: createdProjects[2]._id }
        ];
        for (const vehicle of vehicles) {
        const exists = await mongoose.model('Vehicle').findOne({ placa: vehicle.placa });
        if (!exists) {
            await VehicleModel.createVehicle(vehicle);
            console.log(`Vehículo creado: ${vehicle.placa}`);
        } else {
            console.log(`Vehículo ya existe: ${vehicle.placa}`);
        }
        }
        const accesses = [
        { user: createdUsers[0]._id, resource: 'proyecto', resourceId: createdProjects[0]._id, action: 'crear' },
        { user: createdUsers[1]._id, resource: 'vehiculo', resourceId: createdProjects[1]._id, action: 'leer' },
        { user: createdUsers[2]._id, resource: 'proyecto', resourceId: createdProjects[2]._id, action: 'leer' }
        ];
        for (const access of accesses) {
        await AccessModel.registerAccess(access);
        console.log(`🔏 Acceso registrado: ${access.action} → ${access.resource}`);
        }
        process.exit(0);
    } catch (err) {
        console.error('❌ Error durante la migración:', err);
        process.exit(1);
    }
}

runMigration();
