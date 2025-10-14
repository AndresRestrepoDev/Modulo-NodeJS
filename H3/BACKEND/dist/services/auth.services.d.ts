export declare class AuthService {
    static register(name: string, email: string, password: string, role: string): Promise<{
        id: number;
        name: string;
        email: string;
        role: string;
    }>;
    static login(email: string, password: string): Promise<{
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    }>;
}
//# sourceMappingURL=auth.services.d.ts.map