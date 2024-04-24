namespace api.Interfaces;

public interface IUserQuestionRepository
{
    public Task<Question> CreateAsync(QuestionDto userInput, CancellationToken cancellationToken);

    public Task<PagedList<Question>?> GetAllAsync(PaginationParams paginationParams, CancellationToken cancellationToken);
}