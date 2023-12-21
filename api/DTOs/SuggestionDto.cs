namespace api.DTOs;

public record SuggestionDto(
  [Length(24, 24)] string? UserId,
  [Length(2, 50)] string FullName,
  [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage = "Bad Email Format.")] string Email,
  string Date,
  [Length(5, 500)] string Text
);
