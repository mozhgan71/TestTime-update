namespace api.DTOs;

public record UserDto(
    string Id,
    string Name,
    string Family,
    string Email,
    int Age,
    string Education
);