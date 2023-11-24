export interface AppUserRegister {
    name: string,
    family: string,
    email: string,
    password?: string,
    confirmPassword?: string,
    age: number,
    education?: string,
    rules?: boolean,
}

export interface AppUserUpdate {
    name: string,
    family: string,
    email: string,
    age: number,
    education?: string,
    rules?: boolean,
}