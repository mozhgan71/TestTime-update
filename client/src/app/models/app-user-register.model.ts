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