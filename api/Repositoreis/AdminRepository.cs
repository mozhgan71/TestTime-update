namespace api.Repositoreis;

public class AdminRepository : IAdminRepository
{
    private const string _collectionName = "admins";
    private readonly IMongoCollection<Admin>? _collection;

    public AdminRepository(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var database = client.GetDatabase(dbSettings.DatabaseName);
        _collection = database.GetCollection<Admin>(_collectionName);
    }

    public async Task<AdminResponseDto?> Create(RegisterAdminDto userInput, CancellationToken cancellationToken)
    {
        //check kardane inke email vojod darad ya na
        bool doesExist = await _collection.Find<Admin>(user =>
            user.Email == userInput.Email.ToLower().Trim()).AnyAsync(cancellationToken);

        if (doesExist)
            return null;

        // agar vojod nadasht yek jadid besaz. 
        Admin admin = new(
            Id: null,
            Email: userInput.Email.ToLower().Trim(),
            Password: userInput.Password,
            ConfirmPassword: userInput.ConfirmPassword
        );

        if (_collection is not null)
            await _collection.InsertOneAsync(admin, null, cancellationToken);

        if (admin.Id is not null)
        {
            AdminResponseDto adminResponseDto = new(
                Id: admin.Id,
                Email: admin.Email
            );

            return adminResponseDto;
        }

        return null;
    }

    public async Task<IEnumerable<Admin>?> GetAll(CancellationToken cancellationToken)
    {
        List<Admin> admins = _collection.Find<Admin>(new BsonDocument()).ToList();

        if (!admins.Any())
        {  
            return null;
        }

        return admins;
    }

     public async Task<UpdateResult?> UpdateById(string userId , RegisterAdminDto userInput,CancellationToken cancellationToken)
    {
        var updatedDoc = Builders<Admin>.Update
        .Set(doc => doc.Email, userInput.Email)
        .Set(doc => doc.Password, userInput.Password)
        .Set(doc => doc.ConfirmPassword, userInput.ConfirmPassword);

        return await _collection.UpdateOneAsync<Admin>(doc => doc.Id == userId, updatedDoc);
    }

    public async Task<DeleteResult?> Delete(string userId,CancellationToken cancellationToken)
    {
        return await _collection.DeleteOneAsync<Admin>(doc => doc.Id == userId);
    }
}