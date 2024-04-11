namespace api.DTOs;

public record ApiExceptionDto(
    int StatusCode,
    string Message,
    string? Details,
    DateTime Time
);
