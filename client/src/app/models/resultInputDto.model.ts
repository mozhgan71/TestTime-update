export interface ResultInputDto {
    userId?: string,
    testName: string,
    myDate: string,
    testHour: number,
    testMinute: number,
    testSecond: number,
    numberOfCorrect: number,
    numberOfWrong: number,
    numberOfNoAnswer: number,
    description?: string,
}