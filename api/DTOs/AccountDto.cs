namespace api.DTOs;

public record RegisterDto(
    [MinLength(2), MaxLength(30)] string Name,
    [MinLength(2), MaxLength(30)] string Family,
    [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")] string Email,
    [MinLength(8)] string Password,
    [MinLength(8)] string ConfirmPassword,
    [Range(9, 99)] int Age,
    string? Education,
    bool Rules
);

public record LoginDto(
     string Email,
     string Password
);