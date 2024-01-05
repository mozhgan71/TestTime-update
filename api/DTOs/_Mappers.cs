using System.Security.Cryptography;

namespace api.DTOs;

public class _Mappers
{
    public static AppUser ConvertRegisterDtoToAppUser(RegisterDto userInput)
    {
        // manually dispose HMACSHA512 after being done
        using var hmac = new HMACSHA512();

        return new AppUser(
            Id: null,
            Name: userInput.Name,
            Family: userInput.Family,
            Email: userInput.Email.ToLower().Trim(),
            PasswordHash: hmac.ComputeHash(Encoding.UTF8.GetBytes(userInput.Password)),
            PasswordSalt: hmac.Key,
            Education: userInput.Education,
            Rules: userInput.Rules,
            DateOfBirth: userInput.DateOfBirth,
            Created: DateTime.UtcNow,
            LastActive: DateTime.UtcNow
        );
    }

    public static LoggedInDto ConvertAppUserToLoggedInDto(AppUser appUser, string tokenValue)
    {
        return new LoggedInDto(  
                  Id:appUser.Id!,
                  Name: appUser.Name,
                  Family: appUser.Family,
                  Email: appUser.Email,
                  Age: CustomDateTimeExtensions.CalculateAge(appUser.DateOfBirth),
                  Education: appUser.Education!,
                  Token: tokenValue
            );
    }

    public static UserDto ConvertAppUserToUserDto(AppUser appUser)
    {
        return new UserDto(
            Name: appUser.Name,
            Family: appUser.Family,
            Email: appUser.Email,
            Age: CustomDateTimeExtensions.CalculateAge(appUser.DateOfBirth),
            Education: appUser.Education!,
            Created: appUser.Created,
            LastActive: appUser.LastActive
        // IsPrivate: appUser.IsPrivate,
        );
    }

    public static MemberDto ConvertAppUserToMemberDto(AppUser appUser)
    {
        return new MemberDto(
            Id: appUser.Id!,
            Name: appUser.Name,
            Family: appUser.Family,
            Email: appUser.Email,
            Age: CustomDateTimeExtensions.CalculateAge(appUser.DateOfBirth),
            Education: appUser.Education!,
            LastActive: appUser.LastActive
        );
    }
}