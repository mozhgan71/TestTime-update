namespace api.Repositoreis;

public class ApiExceptionRepository : IApiExceptionRepository
{
    private readonly IMongoCollection<ApiException> _collection;

    public ApiExceptionRepository(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var database = client.GetDatabase(dbSettings.DatabaseName);
        _collection = database.GetCollection<ApiException>("exception-logs");
    }
    public async Task<List<ApiException>?> GetAllAsync(CancellationToken cancellationToken)
    {
        List<ApiException> apiExceptions = await _collection.Find<ApiException>(new BsonDocument()).ToListAsync(cancellationToken);

        if (apiExceptions is null)
            return null;

        return apiExceptions;
    }
}
