export function authorizeRoles(...rolesPermitidos) {
    return (req, res, next) => {
        const userRol = req.user?.rol;
        if (!rolesPermitidos.includes(userRol)) {
        return res.status(403).json({ message: "Rol no autorizado." });
        }
        next();
    };
}
