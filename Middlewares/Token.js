import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
    const token = req.cookies.authToken; 
    if (!token) return res.status(401).json({ message: "No autorizado" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token inválido o expirado" });
    }
}
