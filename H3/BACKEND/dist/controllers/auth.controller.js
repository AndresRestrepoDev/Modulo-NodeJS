import { AuthService } from '../services/auth.services.ts';
export class AuthController {
    static async register(req, res) {
        try {
            const { name, email, password, role } = req.body;
            const user = await AuthService.register(name, email, password, role);
            res.status(201).json(user);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await AuthService.login(email, password);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
//# sourceMappingURL=auth.controller.js.map