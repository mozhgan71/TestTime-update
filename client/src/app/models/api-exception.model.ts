export interface ApiException {
    id: string,
    statusCode: number,
    message: string,
    details: string,
    time: Date
}