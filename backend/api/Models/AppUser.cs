using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;

namespace api.Models;

[CollectionName("users")]
public class AppUser : MongoIdentityUser<ObjectId>
{
    // TODO teach
    // public string? IdentifierHash { get; init; }
    // public string? JtiValue { get; init; }
    public string Name { get; init; } = string.Empty;
    public string Family { get; init; } = string.Empty;
    public DateOnly DateOfBirth { get; init; }
    public string Education { get; init; } = string.Empty;
    public bool Rules { get; init; }
    public DateTime LastActive { get; init; }
    public List<Photo> Photos { get; init; } = [];
    // public int FollowingsCount { get; init; }
    // public int FollowersCount { get; init; }
}

// public record AppUser(
// ObjectId? Id,
// // [property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
// [Length(2, 30)] string Name,
// [Length(2, 30)] string Family,
// [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")] string Email,
// byte[] PasswordSalt, // array
// byte[] PasswordHash,
// DateOnly DateOfBirth,
// //[Range(9, 99)] int Age,
// string? Education,
// bool Rules,
// DateTime Created,
// DateTime LastActive,
// List<Photo> Photos
// );