namespace api.DTOs;

public record RegisterDto(
    [MaxLength(50), RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")] string Email,
    [Length(2, 30)] string UserName,
    [Length(2, 30)] string Name,
    [Length(2, 30)] string Family,
    [MinLength(8), MaxLength(20)] string Password,
    [MinLength(8), MaxLength(20)] string ConfirmPassword,
    [Range(typeof(DateOnly), "1900-01-01", "2050-01-01")] DateOnly DateOfBirth,
    //[Range(9, 99)] int Age,
    string? Education,
    bool Rules
);

public record UpdateDto(
    [Length(2, 30)] string Name,
    [Length(2, 30)] string Family,
    [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")] string Email,
    DateOnly DateOfBirth,
    //[Range(9, 99)] int Age,
    string? Education
);

public record LoginDto(
    [MaxLength(50), RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")] string Email,
    [DataType(DataType.Password), MinLength(8), MaxLength(20)] string Password
);

public class LoggedInDto
{
    // required public string? Token { get; init; } // this one is REQUIRED
    public string? Token { get; init; }
    public string? Email { get; init; }
    public string? Name { get; init; }
    public string? Family { get; init; }
    public int? Age { get; init; }
    public string? Education { get; init; }
    public string? ProfilePhotoUrl { get; init; }
    public bool IsWrongCreds { get; set; }
    public List<string> Errors { get; init; } = [];
}

// public record LoggedInDto(
//     string Id,
//     string Name,
//     string Family,
//     string Email,
//     int Age,
//     string Education,
//     string Token,
//     string? ProfilePhotoUrl
// );