namespace api.Repositoreis;

public class UserRepository : IUserRepository
{
    // field / class members
    private const string _collectionName = "users";
    private readonly IMongoCollection<AppUser>? _collection;

    public UserRepository(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var database = client.GetDatabase(dbSettings.DatabaseName);
        _collection = database.GetCollection<AppUser>(_collectionName);

        // // _tokenService = tokenService;
    }

    public async Task<List<UserDto>> GetAllAsync(CancellationToken cancellationToken)
    {
        List<AppUser> appUsers = await _collection.Find<AppUser>(new BsonDocument()).ToListAsync(cancellationToken);

        List<UserDto> userDtos = [];

        if (appUsers.Count != 0)
        {
            foreach (AppUser appUser in appUsers)
            {
              UserDto userDto = _Mappers.ConvertAppUserToUserDto(appUser);

                userDtos.Add(userDto);
            }

            return userDtos;
        }

        return userDtos; // []
    }

    public async Task<UserDto?> GetByIdAsync(string? userId, CancellationToken cancellationToken)
    {
        AppUser appUser = await _collection.Find<AppUser>(user => user.Id == userId).FirstOrDefaultAsync(cancellationToken);

        if (appUser is not null)
        {
            return _Mappers.ConvertAppUserToUserDto(appUser);
        }

        return null;
    }

    public async Task<UpdateResult?> UpdateByIdAsync(string userId, UpdateDto userInput, CancellationToken cancellationToken)
    {
        var updatedDoc = Builders<AppUser>.Update
        .Set(doc => doc.Name, userInput.Name)
        .Set(doc => doc.Family, userInput.Family)
        .Set(doc => doc.Email, userInput.Email)
        //.Set(doc => doc.Password, userInput.Password)
        //.Set(doc => doc.ConfirmPassword, userInput.ConfirmPassword)
        .Set(doc => doc.DateOfBirth, userInput.DateOfBirth)
        .Set(doc => doc.Education, userInput.Education);

        return await _collection.UpdateOneAsync<AppUser>(doc => doc.Id == userId, updatedDoc);
    }

    public async Task<DeleteResult?> DeleteAsync(string userId, CancellationToken cancellationToken)

    {
        return await _collection.DeleteOneAsync<AppUser>(doc => doc.Id == userId);
    }
}