namespace api.Models;

public record AppUser(
[property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
[MinLength(2), MaxLength(30)] string Name,
[MinLength(2), MaxLength(30)] string Family,
[RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")] string Email,
byte[] PasswordSalt, // array
byte[] PasswordHash,
[Range(9, 99)] int Age,
string? Education,
bool Rules
);