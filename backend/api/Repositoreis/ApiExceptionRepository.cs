namespace api.Repositoreis;

public class ApiExceptionRepository : IApiExceptionRepository
{
    private readonly IMongoCollection<ApiException> _collection;

    public ApiExceptionRepository(IMongoClient client, IMyMongoDbSettings dbSettings)
    {
        var database = client.GetDatabase(dbSettings.DatabaseName);
        _collection = database.GetCollection<ApiException>("exception-logs");
    }

    public async Task<PagedList<ApiException>?> GetAllAsync(PaginationParams paginationParams, CancellationToken cancellationToken)
    {
        IMongoQueryable<ApiException> query = _collection.AsQueryable();

        return await PagedList<ApiException>.CreatePagedListAsync(query, paginationParams.PageNumber, paginationParams.PageSize, cancellationToken);
    }

    // public async Task<List<ApiException>?> GetAllAsync(CancellationToken cancellationToken)
    // {
    //     List<ApiException> apiExceptions = await _collection.Find<ApiException>(new BsonDocument()).ToListAsync(cancellationToken);

    //     if (apiExceptions is null)
    //         return null;

    //     return apiExceptions;
    // }
}
