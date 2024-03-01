namespace api.Models;

public record Suggestion(
[property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
[Length(24, 24)] string? UserId,
[Length(2, 50)] string FullName,
[RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")] string Email,
string Date,
[MinLength(5), MaxLength(500)] string Text
);