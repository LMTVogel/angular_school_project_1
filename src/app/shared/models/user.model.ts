export enum UserRole {
    admin = 'admin',
    guest = 'guest',
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}