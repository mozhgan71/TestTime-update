namespace api.DTOs;

public record UserDto(
    string Name,
    string Family,
    string Email,
    int Age,
    string Education,
    DateTime Created,
    DateTime LastActive,
    List<Photo> Photos
);