export interface LoggedInUser {
    id: string,
    name: string,
    family: string,
    email: string,
    age: number,
    education: string,
    token: string,
    profilePhotoUrl: string,
    roles: string[];
}