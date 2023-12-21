namespace api.DTOs;

public record MemberDto(
    string Id,
    string Name,
    string Family,
    string Email,
    int Age,
    string Education,
    DateTime LastActive 
);