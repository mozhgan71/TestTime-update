namespace api.Models;

public record AppUser(
[property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
[Length(2, 30)] string Name,
[Length(2, 30)] string Family,
[RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")] string Email,
byte[] PasswordSalt, // array
byte[] PasswordHash,
DateOnly DateOfBirth,
//[Range(9, 99)] int Age,
string? Education,
bool Rules,
DateTime Created,
DateTime LastActive,
List<Photo> Photos
);