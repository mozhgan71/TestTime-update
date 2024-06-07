using Microsoft.AspNetCore.Identity;

namespace api.Repositoreis;

public class AccountRepository : IAccountRepository
{
    private const string _collectionName = "users";
    private readonly IMongoCollection<AppUser>? _collection;
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;

    public AccountRepository(IMongoClient client, IMyMongoDbSettings dbSettings, UserManager<AppUser> userManager, ITokenService tokenService)
    {
       var database = client.GetDatabase(dbSettings.DatabaseName);
        _collection = database.GetCollection<AppUser>(AppVariablesExtensions.collectionUsers);
        _userManager = userManager;
        _tokenService = tokenService;
    }

    public async Task<LoggedInDto> CreateAsync(RegisterDto userInput, CancellationToken cancellationToken)
    {
        LoggedInDto loggedInDto = new();

        AppUser appUser = Mappers.ConvertRegisterDtoToAppUser(userInput);

        IdentityResult? userCreatedResult = await _userManager.CreateAsync(appUser, userInput.Password);

        if (userCreatedResult.Succeeded)
        {
            IdentityResult roleResult = await _userManager.AddToRoleAsync(appUser, "member");

            if (!roleResult.Succeeded) // failed
                return loggedInDto;

            string? token = await _tokenService.CreateToken(appUser);

            if (!string.IsNullOrEmpty(token))
            {
                return Mappers.ConvertAppUserToLoggedInDto(appUser, token);
            }
        }
        else // Store and return userCreatedResult errors if failed.
        {
            foreach (IdentityError error in userCreatedResult.Errors)
            {
                loggedInDto.Errors.Add(error.Description);
            }
        }

        return loggedInDto; // failed
    }

    public async Task<LoggedInDto?> LoginAsync(string userLogInEmail, string userLogInPassword, CancellationToken cancellationToken)
    {
        LoggedInDto loggedInDto = new();

        AppUser? appUser;

        // Find appUser by Email or UserName
        appUser = await _userManager!.FindByEmailAsync(userLogInEmail);

        // AppUser appUser = await _collection.Find<AppUser>(user =>
        //     user.Email == userLogInEmail.ToLower().Trim()).FirstOrDefaultAsync(cancellationToken);

        if (appUser is null)
        {
            loggedInDto.IsWrongCreds = true;
            return loggedInDto;
        }

        if (!await _userManager.CheckPasswordAsync(appUser, userLogInPassword)) //CheckPasswordAsync returns boolean
        {
            loggedInDto.IsWrongCreds = true;
            return loggedInDto;
        }

        string? token = await _tokenService.CreateToken(appUser);

        if (!string.IsNullOrEmpty(token))
        {
            return Mappers.ConvertAppUserToLoggedInDto(appUser, token);
        }

        return loggedInDto;

        //Import and use HMACSHA512 including PasswordSalt
        // using var hmac = new HMACSHA512(appUser.PasswordSalt);

        //Convert userIputPassword to Hash
        // var ComptedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userLogInPassword));

        // Check if password is correct and matched with Database PasswordHash.
        // if (appUser.PasswordHash is not null && appUser.PasswordHash.SequenceEqual(ComptedHash))
        // {
        //     if ((appUser.Id).ToString() is not null)
        //     {
        //         string token = await _tokenService.CreateToken(appUser);

        //         return Mappers.ConvertAppUserToLoggedInDto(appUser, token);
        //     }
        // }

        // return null;
    }

    public async Task<LoggedInDto?> ReloadLoggedInUserAsync(string userId, string token, CancellationToken cancellationToken)
    {
        bool isObjectId = ObjectId.TryParse(userId, out ObjectId objectId);

        if (!isObjectId || objectId.Equals(ObjectId.Empty)) return null;

        AppUser appUser = await _collection.Find<AppUser>(appUser => appUser.Id == objectId).FirstOrDefaultAsync(cancellationToken);

        return appUser is null
            ? null
            : Mappers.ConvertAppUserToLoggedInDto(appUser, token);
    }

    public async Task<UpdateResult?> UpdateLastActive(string loggedInUserId, CancellationToken cancellationToken)
    {
        UpdateDefinition<AppUser> newLastActive = Builders<AppUser>.Update
        .Set(appUser =>
            appUser.LastActive, DateTime.UtcNow);

        return await _collection.UpdateOneAsync<AppUser>(user =>
        (user.Id).ToString() == loggedInUserId, newLastActive, null, cancellationToken);
    }

    // public async Task<LoggedInDto?> ReloadLoggedInUserAsync(string? userId, string? tokenValue, CancellationToken cancellationToken)
    // {
    //     AppUser? appUser = await _collection.Find<AppUser>(appUser => appUser.Id == userId).FirstOrDefaultAsync(cancellationToken);

    //     if (appUser?.Id is not null && tokenValue is not null)
    //     {
    //         return Mappers.ConvertAppUserToLoggedInDto(appUser, tokenValue);
    //     }

    //     return null;
    // }

    // private async void UpdateLastActiveInDb(AppUser appUser, CancellationToken cancellationToken)
    // {
    //     UpdateDefinition<AppUser> newLastActive = Builders<AppUser>.Update.Set(user =>
    //                    user.LastActive, DateTime.UtcNow);

    //     await _collection.UpdateOneAsync<AppUser>(user =>
    //     user.Id == appUser.Id, newLastActive, null, cancellationToken);
    // }
}