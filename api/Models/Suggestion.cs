using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Models;

public record Suggestion(
[property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
[MinLength(24), MaxLength(24)] string? UserId,
[MinLength(2), MaxLength(50)] string FullName,
[RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")] string Email,
string Date,
[MinLength(5), MaxLength(500)] string Text
);