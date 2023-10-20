namespace api.Repositoreis;

public class AccountRepository : IAccountRepository
{

    private const string _collectionName = "users";
    private readonly IMongoCollection<AppUser>? _collection;

    public AccountRepository(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var database = client.GetDatabase(dbSettings.DatabaseName);
        _collection = database.GetCollection<AppUser>(_collectionName);
    }

    public async Task<UserDto?> CreateAsync(RegisterDto userInput, CancellationToken cancellationToken)
    {
        // check if user/email already exists
        bool doesAccountExist = await _collection.Find<AppUser>(user =>
            user.Email == userInput.Email.ToLower().Trim()).AnyAsync(cancellationToken);

        if (doesAccountExist)
            return null;

        // if user/email does not exist, create a new AppUser. 
        AppUser appUser = new AppUser(
            Id: null,
            Name: userInput.Name,
            Family: userInput.Family,
            Email: userInput.Email.ToLower().Trim(),
            Password: userInput.Password,
            ConfirmPassword: userInput.ConfirmPassword,
            Age: userInput.Age,
            Education: userInput.Education,
            Rules: userInput.Rules
        );

        if (_collection is not null)
            await _collection.InsertOneAsync(appUser, null, cancellationToken);

        if (appUser.Id is not null)
        {
            UserDto userDto = new UserDto(
                Id: appUser.Id,
                Name: appUser.Name,
                Family: appUser.Family,
                Email: appUser.Email,
                Age: appUser.Age,
                Education: appUser.Education!
            );

            return userDto;
        }

        return null;
    }

    public async Task<UserDto?> LoginAsync(string userLogInEmail, string userLogInPassword, CancellationToken cancellationToken)
    {
        AppUser appUser = await _collection.Find<AppUser>(user =>
            user.Email == userLogInEmail.ToLower().Trim()
            && user.Password == userLogInPassword).FirstOrDefaultAsync(cancellationToken);

        if (appUser is null)
            return null;

        if (appUser.Id is not null)
        {
            UserDto userDto = new UserDto(
                Id: appUser.Id,
                Name: appUser.Name,
                Family: appUser.Family,
                Email: appUser.Email,
                Age: appUser.Age,
                Education: appUser.Education!
            );

            return userDto;
        }

        return null;
    }
}