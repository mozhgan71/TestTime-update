namespace api.DTOs;

public record RegisterAdminDto(
    [MaxLength(50), RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage ="Bad Email Format.")] string Email,
    [DataType(DataType.Password), MinLength(4), MaxLength(20)] string Password,
    [DataType(DataType.Password), MinLength(4), MaxLength(20)] string ConfirmPassword
);

public record AdminResponseDto(
    string Id,
    string Email
);