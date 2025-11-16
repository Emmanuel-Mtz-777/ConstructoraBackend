export class AccessController {
    constructor({ AccessModel }) {
        this.accessModel = AccessModel;
    }
    createAccess=async (req, res) => {
        try {
            const access = await this.accessModel.registerAccess(req.body);
            res.status(201).json(access);
        } catch (error) {
            res.status(500).json({ error: "Error creating access record" });
        }
    }

    getAccesses=async (req, res) => {
        try {
            const accesses = await this.accessModel.getAccesses();
            res.status(200).json(accesses);
        } catch (error) {
            res.status(500).json({ error: "Error fetching access records" });
        }
    }

    getAccessesByUser=async (req, res) => {
        try {
            const { userId } = req.params;
            const accesses = await this.accessModel.getAccessesByUser(userId);
            if (!accesses.length) {
                return res.status(404).json({ error: "No access records found for this user" });
            }
            res.status(200).json(accesses);
        } catch (error) {
            res.status(500).json({ error: "Error fetching user access records" });
        }
    }

    getAccessesByResource=async (req, res) => {
        try {
            const { resource, resourceId } = req.params;
            const accesses = await this.accessModel.getAccessesByResource(resource, resourceId);
            if (!accesses.length) {
                return res.status(404).json({ error: "No access records found for this resource" });
            }
            res.status(200).json(accesses);
        } catch (error) {
            res.status(500).json({ error: "Error fetching resource access records" });
        }
    }
}
