namespace api.Interfaces;

public interface ISuggestionRepository
{
    public Task<Suggestion> CreateAsync(SuggestionDto adminInput, CancellationToken cancellationToken);

    public Task<PagedList<Suggestion>?> GetAllAsync(PaginationParams paginationParams, CancellationToken cancellationToken);

    public Task<List<Suggestion>?> GetByUserIdAsync(string userId, CancellationToken cancellationToken);
}
