namespace api.Interfaces;

public interface IResultRepository
{
    public Task<Result?> CreateAsync(ResultInputDto userInput, CancellationToken cancellationToken);

    public Task<PagedList<Result>?> GetByUserIdAsync(string userId, PaginationParams paginationParams, CancellationToken cancellationToken);

    public Task<Result?> GetByIdAsync(string resultId, CancellationToken cancellationToken);

    public Task<List<Result>?> GetByTestNameAsync(string testName, CancellationToken cancellationToken);

    public Task<List<Result>?> GetAllAsync(CancellationToken cancellationToken);

    public Task<DeleteResult?> DeleteAsync(string resultId, CancellationToken cancellationToken);
}
