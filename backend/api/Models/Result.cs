namespace api.Models;

public record Result(
[property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
[Length(24, 24)] string? UserId,
[Length(1, 15)] string TestName,
string MyDate,
int? TestHour,
int TestMinute,
int TestSecond,
int NumberOfCorrect,
int NumberOfWrong,
int NumberOfNoAnswer,
[MaxLength(200)] string? Description
);