namespace api.DTOs;

public record RegisterDto(
    [Length(2, 30)] string Name,
    [Length(2, 30)] string Family,
    [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")] string Email,
    [MinLength(8)] string Password,
    [MinLength(8)] string ConfirmPassword,
    DateOnly DateOfBirth,
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
    string? Education,
    bool Rules
);

public record LoginDto(
    [MaxLength(50), RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")] string Email,
    [DataType(DataType.Password), MinLength(7), MaxLength(20)] string Password
);

public record LoggedInDto(
    string Id,
    string Name,
    string Family,
    string Email,
    int Age,
    string Education,
    string Token
);