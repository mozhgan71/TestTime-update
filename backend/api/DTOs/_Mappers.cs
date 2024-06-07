namespace api.DTOs;
 
public static class Mappers
{
    public static AppUser ConvertRegisterDtoToAppUser(RegisterDto userInput)
    {
        // manually dispose HMACSHA512 after being done
        // using var hmac = new HMACSHA512();

        return new AppUser
        {
            Email = userInput.Email, // required by AspNet Identity
            UserName = userInput.UserName, // required by AspNet Identity
            Name = userInput.Name.Trim(),
            Family = userInput.Family.Trim(),
            Education = userInput.Education!,
            Rules = userInput.Rules,
            DateOfBirth = userInput.DateOfBirth,
            LastActive = DateTime.UtcNow,
            Photos = []
        };
    }

    public static LoggedInDto ConvertAppUserToLoggedInDto(AppUser appUser, string tokenValue)
    {
        return new LoggedInDto
        {
            Token = tokenValue,
            Email = appUser.NormalizedEmail,
            Name = appUser.Name,
            Family = appUser.Family,
            Age = CustomDateTimeExtensions.CalculateAge(appUser.DateOfBirth),
            Education = appUser.Education!,
            ProfilePhotoUrl = appUser.Photos.FirstOrDefault(photo => photo.IsMain)?.Url_165 // If list is empty it can return null. So use ?
        };
    }

    public static UserDto ConvertAppUserToUserDto(AppUser appUser)
    {
        return new UserDto(
            Name: appUser.Name,
            Family: appUser.Family,
            Email: appUser.NormalizedEmail!,
            Age: CustomDateTimeExtensions.CalculateAge(appUser.DateOfBirth),
            Education: appUser.Education!,
            Created: appUser.CreatedOn,
            LastActive: appUser.LastActive,
            Photos: appUser.Photos
        // IsPrivate: appUser.IsPrivate,
        );
    }

    public static MemberDto ConvertAppUserToMemberDto(AppUser appUser)
    {
        return new MemberDto(
            Id: appUser.Id.ToString(),
            Name: appUser.Name,
            Family: appUser.Family,
            Email: appUser.NormalizedEmail!,
            Age: CustomDateTimeExtensions.CalculateAge(appUser.DateOfBirth),
            Education: appUser.Education!,
            LastActive: appUser.LastActive,
            Photos: appUser.Photos
        );
    }

    public static Photo ConvertPhotoUrlsToPhoto(string[] photoUrls, bool isMain)
    {
        return new Photo(
                    Url_165: photoUrls[0],
                    Url_256: photoUrls[1],
                    Url_enlarged: photoUrls[2],
                    IsMain: isMain
                );
    }

    public static ApiExceptionDto ConvertApiExceptionToApiExceptionDto(ApiException apiException)
    {
        return new ApiExceptionDto(
            StatusCode: apiException.StatusCode,
            Message: apiException.Message!,
            Details: apiException.Details,
            Time: apiException.Time
        );
    }
}