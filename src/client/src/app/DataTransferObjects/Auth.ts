export interface SignInDto {
    login: string;
    password: string;
}

export interface SignUpDto {
    login: string;
    password: string;
}

export interface User {
    username: string;
    role: Role;
}

export enum Role {
    Admin,
    User
}