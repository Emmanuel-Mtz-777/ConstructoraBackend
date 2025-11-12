import { VehicleModel } from "../Models/VehicleModel.js";

export class VehicleController {
    static async createVehicle(req, res) {
        try {
            const vehicle = await VehicleModel.createVehicle(req.body);
            res.status(201).json(vehicle);
        } catch (error) {
            res.status(500).json({ error: "Error creating vehicle" });
        }
    }   
    static async getVehicles(req, res) {
        try {
            const vehicles = await VehicleModel.getVehicles();
            res.status(200).json(vehicles);
        } catch (error) {
            res.status(500).json({ error: "Error fetching vehicles" });
        }
    }
    static async getVehicleById(req, res) {
        try {
            const vehicle = await VehicleModel.getVehicleById(req.params.id);
            if (!vehicle) {
                return res.status(404).json({ error: 'Vehicle not found' });
            }
            res.status(200).json(vehicle);
        } catch (error) {
            res.status(500).json({ error: "Error fetching vehicle" });
        }
    }
    static async updateVehicle(req, res) {
        try {
            const vehicle = await VehicleModel.updateVehicle(req.params.id, req.body);
            if (!vehicle) {
                return res.status(404).json({ error: 'Vehicle not found' });
            }
            res.status(200).json(vehicle);
        } catch (error) {
            res.status(500).json({ error: "Error updating vehicle" });
        }  
    }
    static async deleteVehicle(req, res) {
        try { 
            const vehicle = await VehicleModel.deleteVehicle(req.params.id);
            if (!vehicle) {
                return res.status(404).json({ error: 'Vehicle not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Error deleting vehicle" });
        }
    }
}