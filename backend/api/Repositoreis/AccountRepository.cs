namespace api.Repositoreis;

public class AccountRepository : IAccountRepository
{
    private const string _collectionName = "users";
    private readonly IMongoCollection<AppUser>? _collection;
    private readonly ITokenService _tokenService;

    public AccountRepository(IMongoClient client, IMongoDbSettings dbSettings, ITokenService tokenService)
    {
        var database = client.GetDatabase(dbSettings.DatabaseName);
        _collection = database.GetCollection<AppUser>(_collectionName);
        _tokenService = tokenService;
    }

    public async Task<LoggedInDto?> CreateAsync(RegisterDto userInput, CancellationToken cancellationToken)
    {
        // check if user/email already exists
        bool doesAccountExist = await _collection.Find<AppUser>(user =>
            user.Email == userInput.Email.ToLower().Trim()).AnyAsync(cancellationToken);

        if (doesAccountExist)
            return null;

        //maually dispose HMACSHA512 after being done
        using var hmac = new HMACSHA512();

        // if user/email does not exist, create a new AppUser. 
        AppUser appUser = Mappers.ConvertRegisterDtoToAppUser(userInput);

        if (_collection is not null)
            await _collection.InsertOneAsync(appUser, null, cancellationToken);

        if (appUser.Id is not null)
        {
            LoggedInDto loggedInDto = Mappers.ConvertAppUserToLoggedInDto(appUser,await _tokenService.CreateToken(appUser));

            return loggedInDto;
        }

        return null;
    }

    public async Task<LoggedInDto?> LoginAsync(string userLogInEmail, string userLogInPassword, CancellationToken cancellationToken)
    {
        AppUser appUser = await _collection.Find<AppUser>(user =>
            user.Email == userLogInEmail.ToLower().Trim()).FirstOrDefaultAsync(cancellationToken);

        if (appUser is null)
            return null;

        //Import and use HMACSHA512 including PasswordSalt
        using var hmac = new HMACSHA512(appUser.PasswordSalt);

        //Convert userIputPassword to Hash
        var ComptedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userLogInPassword));

        // Check if password is correct and matched with Database PasswordHash.
        if (appUser.PasswordHash is not null && appUser.PasswordHash.SequenceEqual(ComptedHash))
        {
            if (appUser.Id is not null)
            {
                string token = await _tokenService.CreateToken(appUser);

                return Mappers.ConvertAppUserToLoggedInDto(appUser, token);
            }
        }

        return null;
    }

    public async Task<UpdateResult?> UpdateLastActive(string loggedInUserId, CancellationToken cancellationToken)
    {
        UpdateDefinition<AppUser> newLastActive = Builders<AppUser>.Update
        .Set(appUser =>
            appUser.LastActive, DateTime.UtcNow);

        return await _collection.UpdateOneAsync<AppUser>(user =>
        user.Id == loggedInUserId, newLastActive, null, cancellationToken);
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