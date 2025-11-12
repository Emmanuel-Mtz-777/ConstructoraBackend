import { AccessModel } from "../Models/AccessModel.js";

export class AccessController {
    static async createAccess(req, res) {
        try {
            const access = await AccessModel.registerAccess(req.body);
            res.status(201).json(access);
        } catch (error) {
            res.status(500).json({ error: "Error creating access record" });
        }
    }

    static async getAccesses(req, res) {
        try {
            const accesses = await AccessModel.getAccesses();
            res.status(200).json(accesses);
        } catch (error) {
            res.status(500).json({ error: "Error fetching access records" });
        }
    }

    static async getAccessesByUser(req, res) {
        try {
            const { userId } = req.params;
            const accesses = await AccessModel.getAccessesByUser(userId);
            if (!accesses.length) {
                return res.status(404).json({ error: "No access records found for this user" });
            }
            res.status(200).json(accesses);
        } catch (error) {
            res.status(500).json({ error: "Error fetching user access records" });
        }
    }

    static async getAccessesByResource(req, res) {
        try {
            const { resource, resourceId } = req.params;
            const accesses = await AccessModel.getAccessesByResource(resource, resourceId);
            if (!accesses.length) {
                return res.status(404).json({ error: "No access records found for this resource" });
            }
            res.status(200).json(accesses);
        } catch (error) {
            res.status(500).json({ error: "Error fetching resource access records" });
        }
    }
}
