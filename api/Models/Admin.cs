using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace api.Models;

public record Admin(
[property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
[RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")]string Email,
[MinLength(8)] string Password,
[MinLength(8)] string? ConfirmPassword
);