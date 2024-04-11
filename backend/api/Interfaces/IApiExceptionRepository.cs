namespace api.Interfaces;

public interface IApiExceptionRepository
{
    public Task<List<ApiException>?> GetAllAsync(CancellationToken cancellationToken);
}