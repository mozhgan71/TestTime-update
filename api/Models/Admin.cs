namespace api.Models;

public record Admin(
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
    string Email,
    string Password,
    string ConfirmPassword
);