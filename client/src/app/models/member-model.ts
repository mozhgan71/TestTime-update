import { Photo } from "./photo.model";

export interface Member {
    id: string,
    name: string,
    family: string,
    email: string,
    age: string | undefined,
    education: string,
    lastActive: Date,
    photos: Photo[]
}