export interface User {
    id: number;
    username: string;
    fullname: string;
    email: string;
    social_username: string;
    contact_number: string;
    default_address: string;
    role: 'user' | 'admin';
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    authenticated: boolean;
    toastContent: string | null;
    cartCount: number | null;
};
