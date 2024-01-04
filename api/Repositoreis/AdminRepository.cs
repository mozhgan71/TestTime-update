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

    public async Task<AdminResponseDto?> CreateAsync(RegisterAdminDto userInput, CancellationToken cancellationToken)
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

    public async Task<List<AdminResponseDto>> GetAllAsync(CancellationToken cancellationToken)
    {
        List<Admin> admins = await _collection.Find<Admin>(new BsonDocument()).ToListAsync();

        List<AdminResponseDto> adminResponseDtos = new List<AdminResponseDto>();

        if (admins.Count != 0)
        {
            foreach (Admin admin in admins)
            {
                AdminResponseDto adminResponseDto = new AdminResponseDto(
                    Id: admin.Id!,
                    Email: admin.Email
                );

                adminResponseDtos.Add(adminResponseDto);
            }

            return adminResponseDtos;
        }

        return adminResponseDtos;
    }

    public async Task<UpdateResult?> UpdateByIdAsync(string userId, RegisterAdminDto userInput, CancellationToken cancellationToken)
    {
        var updatedDoc = Builders<Admin>.Update
        .Set(doc => doc.Email, userInput.Email)
        .Set(doc => doc.Password, userInput.Password)
        .Set(doc => doc.ConfirmPassword, userInput.ConfirmPassword);

        return await _collection.UpdateOneAsync<Admin>(doc => doc.Id == userId, updatedDoc);
    }

    public async Task<DeleteResult?> DeleteAsync(string userId, CancellationToken cancellationToken)

    {
        return await _collection.DeleteOneAsync<Admin>(doc => doc.Id == userId);
    }

    public async Task<AdminResponseDto?> LoginAsync(AdminLoginDto userInput, CancellationToken cancellationToken)
    {
        Admin admin = await _collection.Find<Admin>(user =>
            user.Email == userInput.Email.ToLower().Trim()
            && user.Password == userInput.Password).FirstOrDefaultAsync(cancellationToken);

        if (admin is null)
            return null;

        if (admin.Id is not null)
        {
            AdminResponseDto adminResponseDto = new AdminResponseDto(
                Id: admin.Id,
                Email: admin.Email
            );

            return adminResponseDto;
        }

        return null;
    }
}