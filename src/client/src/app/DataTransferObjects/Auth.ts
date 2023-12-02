export interface SignInDto {
    username: string;
    password: string;
}

export interface SignUpDto {
    username: string;
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