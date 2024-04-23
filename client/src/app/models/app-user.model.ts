export interface AppUser {
    id: string,
    name: string,
    family: string,
    email: string,
    age: string | undefined,
    education: string,
    created: Date,
    lastActive: Date,
    token: string,
}