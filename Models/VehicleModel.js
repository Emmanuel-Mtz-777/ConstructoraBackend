import Mongo from '../Database/Mongo.js';
import { Schema } from 'mongoose';

const VehicleSchema = new Schema({
    placa: { type: String, required: true },
    tipo: { type: String, required: true },
    asignadoAProyecto: {
        type: Schema.Types.ObjectId, 
        ref: 'Project',
        required: false
    },
    estado: { type: String, required: true }
}, { timestamps: true });

export const Vehicle = Mongo.model('Vehicle', VehicleSchema);

export class VehicleModel {
    static async createVehicle(data) {
        return await Vehicle.create(data);
    }

    static async getVehicles() {
        return await Vehicle.find().populate('asignadoAProyecto');
    }
    static async getVehicleById(id) {
        return await Vehicle.findById(id).populate('asignadoAProyecto');
    }
    static async updateVehicle(id, data) {
        return await Vehicle.findByIdAndUpdate(id, data, { new: true });
    }
    static async deleteVehicle(id) {
        return await Vehicle.findByIdAndDelete(id);
    }
}
