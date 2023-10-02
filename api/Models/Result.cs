using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Models;

public record Result(
[property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
[MinLength(24), MaxLength(24)] string? UserId,
[MinLength(1), MaxLength(15)]string TestName,
string MyDate,
int? TestHour,
int TestMinute,
int TestSecond,
int NumberOfCorrect,
int NumberOfWrong,
int NumberOfNoAnswer,
[MaxLength(200)] string? Description
);