import { Photo } from "./photo.model";

export interface User {
    Name: string,
    Family: string,
    Email: string,
    Age: number,
    Education: string,
    Created: Date,
    LastActive: Date,
    Photos: Photo[]
}