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