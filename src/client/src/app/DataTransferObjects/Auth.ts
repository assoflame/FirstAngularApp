export interface SignInDto {
    username: string;
    password: string;
}

export interface SignUpDto {
    username: string;
    password: string;
}

export interface User {
    id: number,
    username: string,
    role: Role,
    accessToken: string,
    refreshToken: string
}

export enum Role {
    Admin = 'admin',
    User = 'user'
}

export interface TokenDto {
    accessToken: string,
    refreshToken: string
}