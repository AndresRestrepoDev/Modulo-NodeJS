import { verifyToken } from '../utils/jwt.js';
export const authenticate = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
    try {
        const token = header.split(' ')[1];
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
export const authorize = (roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !roles.includes(user.role)) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        next();
    };
};
//# sourceMappingURL=auth.middleware.js.map