export interface AppUserRegister {
    name: string,
    family: string,
    email: string,
    password?: string,
    confirmPassword?: string,
    dateOfBirth: string | undefined,
    education?: string,
    rules?: boolean,
}

export interface AppUserUpdate {
    name: string,
    family: string,
    email: string,
    age: string | undefined,
    education?: string,
    rules?: boolean,
}