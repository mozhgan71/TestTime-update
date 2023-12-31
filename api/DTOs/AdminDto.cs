namespace api.DTOs;

public record RegisterAdminDto(
    [MaxLength(50), RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")] string Email,
    [DataType(DataType.Password), Length(4, 20)] string Password,
    [DataType(DataType.Password), Length(4, 20)] string ConfirmPassword
);

public record AdminResponseDto(
    string Id,
    string Email
);

public record AdminLoginDto(
    string Email,
    string Password
);