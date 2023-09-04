export interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    token: string;
    role: 'admin' | 'user';
}

export interface CreateUserData {
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    token: string;
    role: 'admin' | 'user';
}

export interface UpdateUserData {
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    phone: string;
    token?: string;
    role?: 'admin' | 'user';
}