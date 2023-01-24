export interface UserCredentials {
    email: string;
    password: string;
}

export interface UserRegistration extends UserCredentials {
    name: string;
    bday: Date;
}

export interface Token {
    token: string;
}
