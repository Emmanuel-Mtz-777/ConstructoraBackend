export class ReportsController {
    constructor({ AccessModel }) {
        this.AccessModel = AccessModel;
    }

    getReportsAccesos = async (req, res) => {
        try {
            const { startDate, endDate, resource, page = 1, limit = 10 } = req.query;

            const filtros = {};

            if (startDate || endDate) {
                filtros.timestamp = {};
                if (startDate) filtros.timestamp.$gte = new Date(startDate);
                if (endDate)   filtros.timestamp.$lte = new Date(endDate);
            }

            if (resource) filtros.resource = resource;

            const pipeline = [
                { $match: filtros },

                // Agrupación por usuario
                {
                    $group: {
                        _id: "$user",
                        totalAccesos: { $sum: 1 }
                    }
                },

                { $sort: { totalAccesos: -1 } },

                { $skip: (page - 1) * limit },
                { $limit: parseInt(limit) }
            ];

            const result = await this.AccessModel.aggregate(pipeline);

            res.json({
                filtros,
                page: Number(page),
                limit: Number(limit),
                resultados: result
            });

        } catch (e) {
            console.error(e);
            res.status(500).json({ error: "Error generando reporte" });
        }
    }
}
