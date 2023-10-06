namespace api.Repositoreis;

public class AdminRepository :IAdminRepository
{
    private const string _collectionName = "admins";
    private readonly IMongoCollection<Admin>? _collection;

    public AdminRepository(IMongoClient client,IMongoDbSettings dbSettings)
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
        Admin admin = new (
            Id: null,
            Email: userInput.Email.ToLower().Trim(),
            Password: userInput.Password,
            ConfirmPassword: userInput.ConfirmPassword
        );

        if (_collection is not null)
            await _collection.InsertOneAsync(admin, null, cancellationToken);

        if (admin.Id is not null)
        {
            AdminResponseDto adminResponseDto = new (
                Id: admin.Id,
                Email: admin.Email 
            );

            return adminResponseDto;
        }

        return null;
    }
}