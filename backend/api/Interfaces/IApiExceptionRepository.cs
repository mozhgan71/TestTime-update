namespace api.Interfaces;

public interface IApiExceptionRepository
{
    public Task<PagedList<ApiException>?> GetAllAsync(PaginationParams paginationParams, CancellationToken cancellationToken);
}