export class VehicleController {
    constructor({VehicleModel}) {
        this.vehicleModel = VehicleModel;
    }
    createVehicle=async (req, res) => {
        try {
            const vehicle = await this.vehicleModel.createVehicle(req.body);
            res.status(201).json(vehicle);
        } catch (error) {
            res.status(500).json({ error: "Error creating vehicle" });
        }
    }   
    getVehicles=async (req, res) => {
        try {
            const vehicles = await this.vehicleModel.getVehicles();
            res.status(200).json(vehicles);
        } catch (error) {
            res.status(500).json({ error: "Error fetching vehicles" });
        }
    }
    getVehicleById=async (req, res) => {
        try {
            const vehicle = await this.vehicleModel.getVehicleById(req.params.id);
            if (!vehicle) {
                return res.status(404).json({ error: 'Vehicle not found' });
            }
            res.status(200).json(vehicle);
        } catch (error) {
            res.status(500).json({ error: "Error fetching vehicle" });
        }
    }
    updateVehicle=async (req, res) => {
        try {
            const vehicle = await this.vehicleModel.updateVehicle(req.params.id, req.body);
            if (!vehicle) {
                return res.status(404).json({ error: 'Vehicle not found' });
            }
            res.status(200).json(vehicle);
        } catch (error) {
            res.status(500).json({ error: "Error updating vehicle" });
        }  
    }
    deleteVehicle=async (req, res) => {
        try { 
            const vehicle = await this.vehicleModel.deleteVehicle(req.params.id);
            if (!vehicle) {
                return res.status(404).json({ error: 'Vehicle not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: "Error deleting vehicle" });
        }
    }
}