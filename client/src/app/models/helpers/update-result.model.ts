export interface UpdateResult {
    isAcknowledged: boolean,
    isModifiedCountAvailable: boolean,
    matchedCount: number,
    modifiedCount: number,
    upsertedId: any
}

/////// MondoDb Server Returns ///////
// {
//     "isAcknowledged": true,
//     "isModifiedCountAvailable": true,
//     "matchedCount": 1,
//     "modifiedCount": 1, // successful / 0: failed
//     "upsertedId": null
// }